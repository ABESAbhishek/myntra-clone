const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const defaultSchema = {
  users: [],
  addresses: [],
  categories: [],
  products: [],
  cart: [],
  wishlist: [],
  orders: [],
  reviews: [],
  coupons: [],
  counters: {
    users: 0,
    addresses: 0,
    categories: 0,
    products: 0,
    cart: 0,
    wishlist: 0,
    orders: 0,
    reviews: 0,
    coupons: 0
  }
};

class Database {
  constructor() {
    this.data = { ...defaultSchema };
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure all collections exist
        for (const key of Object.keys(defaultSchema)) {
          if (!this.data[key]) {
            this.data[key] = defaultSchema[key];
          }
        }
      } catch (err) {
        console.error('Error reading db.json, initializing fresh schema', err);
        this.save();
      }
    } else {
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving db.json', err);
    }
  }

  nextId(collection) {
    if (!this.data.counters) this.data.counters = {};
    if (!this.data.counters[collection]) {
      const maxId = (this.data[collection] || []).reduce((max, item) => Math.max(max, typeof item.id === 'number' ? item.id : 0), 0);
      this.data.counters[collection] = maxId;
    }
    this.data.counters[collection] += 1;
    return this.data.counters[collection];
  }

  findAll(collection, predicate = null) {
    const list = this.data[collection] || [];
    if (!predicate) return [...list];
    if (typeof predicate === 'function') {
      return list.filter(predicate);
    }
    return list.filter(item => {
      for (const [k, v] of Object.entries(predicate)) {
        if (item[k] !== v) return false;
      }
      return true;
    });
  }

  findOne(collection, predicate) {
    const list = this.data[collection] || [];
    if (typeof predicate === 'function') {
      return list.find(predicate) || null;
    }
    return list.find(item => {
      for (const [k, v] of Object.entries(predicate)) {
        if (item[k] !== v) return false;
      }
      return true;
    }) || null;
  }

  findById(collection, id) {
    const numId = Number(id);
    return (this.data[collection] || []).find(item => item.id === id || item.id === numId) || null;
  }

  insert(collection, doc) {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }
    const newDoc = {
      id: doc.id !== undefined ? doc.id : this.nextId(collection),
      ...doc,
      created_at: doc.created_at || new Date().toISOString()
    };
    this.data[collection].push(newDoc);
    this.save();
    return newDoc;
  }

  update(collection, id, updates) {
    const numId = Number(id);
    const list = this.data[collection] || [];
    const index = list.findIndex(item => item.id === id || item.id === numId);
    if (index === -1) return null;

    const updated = {
      ...list[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    list[index] = updated;
    this.save();
    return updated;
  }

  delete(collection, id) {
    const numId = Number(id);
    const list = this.data[collection] || [];
    const index = list.findIndex(item => item.id === id || item.id === numId);
    if (index === -1) return false;

    list.splice(index, 1);
    this.save();
    return true;
  }

  deleteMany(collection, predicate) {
    const list = this.data[collection] || [];
    const initialLen = list.length;
    let filtered;
    if (typeof predicate === 'function') {
      filtered = list.filter(item => !predicate(item));
    } else {
      filtered = list.filter(item => {
        for (const [k, v] of Object.entries(predicate)) {
          if (item[k] === v) return false;
        }
        return true;
      });
    }
    this.data[collection] = filtered;
    this.save();
    return initialLen - filtered.length;
  }

  clear(collection) {
    this.data[collection] = [];
    if (this.data.counters) {
      this.data.counters[collection] = 0;
    }
    this.save();
  }
}

const db = new Database();
module.exports = db;
