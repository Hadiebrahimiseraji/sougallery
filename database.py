import json
import os
from datetime import datetime
from pathlib import Path

class DatabaseManager:
    def __init__(self, db_file='database.json'):
        self.db_file = db_file
        self.data = self.load()

    def load(self):
        if os.path.exists(self.db_file):
            with open(self.db_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {
            'categories': [],
            'products': [],
            'images': {},
            'lastUpdate': None
        }

    def save(self):
        self.data['lastUpdate'] = datetime.now().isoformat()
        with open(self.db_file, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)

    def add_category(self, category_name):
        if category_name not in self.data['categories']:
            self.data['categories'].append(category_name)
            self.save()
            return True
        return False

    def remove_category(self, category_name):
        if category_name in self.data['categories']:
            self.data['categories'].remove(category_name)
            self.data['products'] = [p for p in self.data['products'] if p['category'] != category_name]
            self.save()
            return True
        return False

    def add_product(self, product_data):
        product = {
            'id': str(int(datetime.now().timestamp() * 1000)),
            'category': product_data.get('category'),
            'name': product_data.get('name'),
            'price': float(product_data.get('price', 0)),
            'stock': int(product_data.get('stock', 0)),
            'size': product_data.get('size', ''),
            'color': product_data.get('color', ''),
            'description': product_data.get('description', ''),
            'image': product_data.get('image'),
            'createdAt': datetime.now().isoformat()
        }
        self.data['products'].append(product)
        if product.get('image'):
            self.data['images'][product['id']] = product['image']
        self.save()
        return product['id']

    def remove_product(self, product_id):
        self.data['products'] = [p for p in self.data['products'] if p['id'] != product_id]
        if product_id in self.data['images']:
            del self.data['images'][product_id]
        self.save()
        return True

    def get_products_by_category(self, category):
        return [p for p in self.data['products'] if p['category'] == category]

    def get_all_products(self):
        return self.data['products']

    def get_all_categories(self):
        return self.data['categories']

    def export_json(self, filename=None):
        if not filename:
            filename = f"export-{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        export_data = {
            'store': 'sougallery',
            'categories': self.data['categories'],
            'products': self.data['products'],
            'exportedAt': datetime.now().isoformat(),
            'totalProducts': len(self.data['products']),
            'totalCategories': len(self.data['categories'])
        }
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, ensure_ascii=False, indent=2)
        return filename

    def get_statistics(self):
        return {
            'totalProducts': len(self.data['products']),
            'totalCategories': len(self.data['categories']),
            'totalImages': len(self.data['images']),
            'categories': self.data['categories'],
            'lastUpdate': self.data.get('lastUpdate')
        }

if __name__ == '__main__':
    db = DatabaseManager()
    print(json.dumps(db.get_statistics(), ensure_ascii=False, indent=2))