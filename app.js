class StoreManager {
  constructor() {
    this.categories = JSON.parse(localStorage.getItem('categories')) || [];
    this.products = JSON.parse(localStorage.getItem('products')) || [];
    this.images = JSON.parse(localStorage.getItem('images')) || {};
    this.init();
  }

  init() {
    this.setupTabNavigation();
    this.setupImagePreview();
    this.render();
    this.updateStats();
  }

  setupTabNavigation() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        const tabId = e.target.dataset.tab + '-tab';
        document.getElementById(tabId).classList.add('active');
      });
    });
  }

  setupImagePreview() {
    const fileInput = document.getElementById('productImage');
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const preview = document.getElementById('imagePreview');
          preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
          fileInput.dataset.base64 = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  addCategory() {
    const input = document.getElementById('newCategory').value.trim();
    if (!input) {
      alert('لطفاً نام دسته‌بندی را وارد کنید');
      return;
    }
    if (this.categories.includes(input)) {
      alert('این دسته‌بندی قبلاً وجود دارد');
      return;
    }
    this.categories.push(input);
    this.saveToLocalStorage();
    document.getElementById('newCategory').value = '';
    this.render();
  }

  removeCategory(category) {
    if (!confirm(`آیا مطمئن هستید که می‌خواهید "${category}" را حذف کنید؟`)) return;
    this.categories = this.categories.filter(c => c !== category);
    this.products = this.products.filter(p => p.category !== category);
    this.saveToLocalStorage();
    this.render();
  }

  addProduct() {
    const category = document.getElementById('productCategory').value;
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const size = document.getElementById('productSize').value.trim();
    const color = document.getElementById('productColor').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const fileInput = document.getElementById('productImage');

    if (!category || !name || !price || !stock) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }

    const productId = Date.now().toString();
    const product = {
      id: productId,
      category,
      name,
      price,
      stock,
      size,
      color,
      description,
      image: fileInput.dataset.base64 || null,
      createdAt: new Date().toISOString()
    };

    if (fileInput.dataset.base64) {
      this.images[productId] = fileInput.dataset.base64;
    }

    this.products.push(product);
    this.saveToLocalStorage();
    this.clearProductForm();
    this.render();
  }

  removeProduct(productId) {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟')) return;
    this.products = this.products.filter(p => p.id !== productId);
    delete this.images[productId];
    this.saveToLocalStorage();
    this.render();
  }

  clearProductForm() {
    document.getElementById('productCategory').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productStock').value = '';
    document.getElementById('productSize').value = '';
    document.getElementById('productColor').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productImage').dataset.base64 = '';
    document.getElementById('imagePreview').innerHTML = '';
  }

  filterProducts() {
    const filter = document.getElementById('categoryFilter').value;
    this.renderProducts(filter);
  }

  renderCategories() {
    const list = document.getElementById('categoryList');
    list.innerHTML = this.categories.map(cat => `
      <li class="category-item">
        <span>${cat}</span>
        <button class="btn btn-danger" onclick="manager.removeCategory('${cat}')">
          🗑️ حذف
        </button>
      </li>
    `).join('');

    const selects = ['productCategory', 'categoryFilter'];
    selects.forEach(id => {
      const select = document.getElementById(id);
      const currentValue = select.value;
      select.innerHTML = '<option value="">اختیار کنید</option>' +
        this.categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
      select.value = currentValue;
    });
  }

  renderProducts(filter = '') {
    const filtered = filter ? this.products.filter(p => p.category === filter) : this.products;
    const list = document.getElementById('productsList');
    
    list.innerHTML = filtered.map(product => `
      <div class="product-card">
        <div class="product-image">
          ${product.image ? `<img src="${product.image}" alt="${product.name}">` : '<div style="background: #f0f0f0; display: flex; align-items: center; justify-content: center; height: 100%; color: #999;">بدون تصویر</div>'}
        </div>
        <div class="product-info">
          <div>
            <div class="product-header">
              <span class="product-title">${product.name}</span>
              <span class="product-price">${product.price.toLocaleString()} تومان</span>
            </div>
            <div class="product-meta">
              ${product.size ? `<div class="meta-item"><span class="meta-label">سایز:</span> ${product.size}</div>` : ''}
              ${product.color ? `<div class="meta-item"><span class="meta-label">رنگ:</span> ${product.color}</div>` : ''}
              <div class="meta-item"><span class="meta-label">موجودی:</span> ${product.stock}</div>
              <div class="meta-item"><span class="meta-label">دسته:</span> ${product.category}</div>
            </div>
            ${product.description ? `<div class="product-meta"><small>${product.description}</small></div>` : ''}
          </div>
          <div class="product-actions">
            <button class="btn btn-danger" onclick="manager.removeProduct('${product.id}')">
              🗑️ حذف
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  render() {
    this.renderCategories();
    this.renderProducts();
    this.updateStats();
  }

  updateStats() {
    document.getElementById('productCount').textContent = this.products.length;
    document.getElementById('categoryCount').textContent = this.categories.length;
  }

  saveToLocalStorage() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
    localStorage.setItem('products', JSON.stringify(this.products.map(p => ({
      ...p,
      image: null
    }))));
    localStorage.setItem('images', JSON.stringify(this.images));
  }

  async saveToDB() {
    const logDiv = document.getElementById('syncLog');
    logDiv.innerHTML = '';
    this.addLog('شروع فرایند ذخیره‌سازی...', 'info');

    try {
      const data = {
        categories: this.categories,
        products: this.products.map(p => ({
          ...p,
          image: p.image ? p.image.substring(0, 100) + '...' : null
        })),
        timestamp: new Date().toISOString(),
        imageCount: Object.keys(this.images).length
      };

      this.addLog(`تعداد محصولات: ${this.products.length}`, 'info');
      this.addLog(`تعداد دسته‌بندی‌ها: ${this.categories.length}`, 'info');
      this.addLog(`تعداد تصاویر: ${Object.keys(this.images).length}`, 'info');

      const database = {
        categories: this.categories,
        products: this.products,
        images: this.images,
        lastUpdate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(database, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `database-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);

      this.addLog('✅ فایل JSON آماده برای دانلود شد', 'success');
      this.addLog('⏰ آخرین بروزرسانی: ' + new Date().toLocaleString('fa-IR'), 'success');
      document.getElementById('lastSync').textContent = new Date().toLocaleString('fa-IR');

      this.addLog('برای آپلود به GitHub و Google Drive، از دستورات زیر استفاده کنید:', 'info');
      this.addLog('git add . && git commit -m "Update store data" && git push', 'info');
    } catch (error) {
      this.addLog(`❌ خطا: ${error.message}`, 'error');
    }
  }

  exportJSON() {
    const data = {
      store: 'sougallery',
      categories: this.categories,
      products: this.products,
      exportedAt: new Date().toISOString(),
      totalProducts: this.products.length,
      totalCategories: this.categories.length
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sougallery-data-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    this.addLog('📥 دانلود JSON با موفقیت انجام شد', 'success');
  }

  clearAllData() {
    if (!confirm('هشدار! این عملیات تمام داده‌ها را حذف خواهد کرد. مطمئن هستید؟')) return;
    if (!confirm('این عملیات قابل برگشت نیست. دوباره تأیید کنید.')) return;

    this.categories = [];
    this.products = [];
    this.images = {};
    this.saveToLocalStorage();
    this.render();
    alert('تمام داده‌ها حذف شد.');
  }

  addLog(message, type = 'info') {
    const logDiv = document.getElementById('syncLog');
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    const time = new Date().toLocaleTimeString('fa-IR');
    entry.textContent = `[${time}] ${message}`;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
  }
}

const manager = new StoreManager();

function addCategory() {
  manager.addCategory();
}

function addProduct() {
  manager.addProduct();
}

function filterProducts() {
  manager.filterProducts();
}

function saveToDB() {
  manager.saveToDB();
}

function exportJSON() {
  manager.exportJSON();
}

function clearAllData() {
  manager.clearAllData();
}