import React, { useState, useMemo } from 'react';
import { Search, Plus, Calendar, MapPin, Upload, X, Filter, ChevronDown } from 'lucide-react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([
    { id: 1, category: 'electronics', name: '에어팟 프로', description: '케이스 포함, 왼쪽 이어폰에 스크래치', location: '도서관 3층', date: '2025-01-15', status: 'found', image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, category: 'wallet', name: '루이비통 반지갑', description: '갈색 가죽, 카드 3장과 현금 포함', location: '학생식당', date: '2025-01-14', status: 'lost', image: null },
    { id: 3, category: 'keyring', name: '라이언 키링', description: '자동차 키 포함, 열쇠 5개', location: '주차장 B2', date: '2025-01-13', status: 'found', image: null },
    { id: 4, category: 'card', name: '신한은행 체크카드', description: '홍나리 명의', location: 'ATM 앞', date: '2025-01-12', status: 'found', image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, category: 'cosmetics', name: '디올 립스틱', description: '999번 매트 색상', location: '본관 3층 여자 화장실', date: '2025-01-11', status: 'lost', image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newItem, setNewItem] = useState({
    category: 'electronics',
    name: '',
    description: '',
    location: '',
    status: 'lost',
    image: null,
  });

  const categories = {
    all: { name: '전체', color: 'bg-gray-100', icon: '📦' },
    wallet: { name: '지갑', color: 'bg-[#FFE4B5]', icon: '👛' },
    electronics: { name: '전자기기', color: 'bg-[#B5E7FF]', icon: '🎧' },
    keyring: { name: '인형/키링', color: 'bg-[#C8E6C9]', icon: '🔑' },
    cosmetics: { name: '화장품', color: 'bg-[#FFD1DC]', icon: '💄' },
    card: { name: '카드/신분증', color: 'bg-[#E1BEE7]', icon: '💳' },
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchTerm, selectedCategory, selectedStatus]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.location) {
      alert('물품명과 위치는 필수 입력 사항입니다.');
      return;
    }

    const item = {
      ...newItem,
      id: items.length + 1,
      date: new Date().toISOString().split('T')[0],
    };

    setItems([item, ...items]);
    setShowAddModal(false);
    setNewItem({
      category: 'electronics',
      name: '',
      description: '',
      location: '',
      status: 'lost',
      image: null,
    });
    setImagePreview(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleStatusToggle = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, status: item.status === 'lost' ? 'found' : 'lost' }
        : item
    ));
    setShowDetailModal(false);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setImagePreview(null);
    setNewItem({
      category: 'electronics',
      name: '',
      description: '',
      location: '',
      status: 'lost',
      image: null,
    });
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="max-width-container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <span>💎</span>
              </div>
              <div className="logo-text">
                <h1>나리의 보물찾기</h1>
                <p>소중한 물건을 함께 찾아드려요 ✨</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              <Plus size={20} />
              <span>분실물 등록</span>
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-width-container">
        <div className="search-container">
          <div className="search-wrapper">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="분실물 이름, 설명, 위치로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {Object.entries(categories).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.icon} {value.name}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">🌟 모든 상태</option>
              <option value="lost">😢 잃어버림</option>
              <option value="found">🎉 발견됨</option>
            </select>
          </div>
        </div>

        {/* Category Cards */}
        <div className="category-grid">
          {Object.entries(categories).slice(1).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`category-card ${selectedCategory === key ? 'active' : ''}`}
            >
              <div className="category-icon">{value.icon}</div>
              <div className="category-name">{value.name}</div>
              <div className="category-count">
                {items.filter(item => item.category === key).length}개
              </div>
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="items-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="item-card"
              data-category={item.category}
            >
              {item.image && <img src={item.image} alt={item.name} className="item-card-image" />}
              <div className="item-card-header"></div>
              <div className="item-card-body">
                <div className="item-header">
                  <div>
                    <span className="item-category-icon">{categories[item.category].icon}</span>
                  </div>
                  <span className={`item-status ${item.status === 'lost' ? 'status-lost' : 'status-found'}`}>
                    {item.status === 'lost' ? '🔍 찾는 중' : '✨ 발견!'}
                  </span>
                </div>
                <h3 className="item-title">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <div className="item-location">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>
                  <div className="item-date">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔮</div>
            <div className="empty-title">아직 등록된 분실물이 없어요</div>
            <div className="empty-subtitle">첫 번째 분실물을 등록해보세요!</div>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                <span>💎</span>
                분실물 등록하기
              </h2>
              <button
                onClick={closeModal}
                className="modal-close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">이미지</label>
                <div className="image-upload-wrapper">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload-input"
                  />
                  <label htmlFor="imageUpload" className="image-upload-label">
                    <Upload size={20} />
                    <span>이미지 선택</span>
                  </label>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">분실물 상태</label>
                <select
                  value={newItem.status}
                  onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                  className="form-select"
                >
                  <option value="lost">😢 잃어버렸어요</option>
                  <option value="found">🎉 찾았어요</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">카테고리</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="form-select"
                >
                  {Object.entries(categories).slice(1).map(([key, value]) => (
                    <option key={key} value={key}>{value.icon} {value.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">분실물 이름 *</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="form-input"
                  placeholder="예: 에어팟, 신용카드, 자동차 키"
                />
              </div>
              <div className="form-group">
                <label className="form-label">설명</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="form-textarea"
                  rows="3"
                  placeholder="분실물에 대한 자세한 설명을 입력하세요"
                />
              </div>
              <div className="form-group">
                <label className="form-label">위치 *</label>
                <input
                  type="text"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  className="form-input"
                  placeholder="예: 중앙도서관 3층, 학생식당"
                />
              </div>
            </div>
            <div className="form-actions">
              <button
                onClick={closeModal}
                className="btn-secondary"
              >
                취소
              </button>
              <button
                onClick={handleAddItem}
                className="btn-primary"
              >
                ✨ 등록하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                <span>🔍</span>
                분실물 상세정보
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="modal-close"
              >
                <X size={24} />
              </button>
            </div>
            {selectedItem.image && <img src={selectedItem.image} alt={selectedItem.name} className="detail-modal-image" />}
            <div className="detail-header">
              <span className="detail-icon">{categories[selectedItem.category].icon}</span>
              <div className="detail-info">
                <div className="detail-title">{selectedItem.name}</div>
                <span className={`item-status ${selectedItem.status === 'lost' ? 'status-lost' : 'status-found'}`}>
                  {selectedItem.status === 'lost' ? '🔍 찾는 중' : '✨ 발견됨'}
                </span>
              </div>
            </div>
            <div className="detail-content">
              <div className="detail-item">
                <div className="detail-label">📝 설명</div>
                <div className="detail-value">{selectedItem.description || '설명이 없습니다.'}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">📍 위치</div>
                <div className="detail-value">
                  <MapPin size={16} />
                  {selectedItem.location}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">📅 날짜</div>
                <div className="detail-value">
                  <Calendar size={16} />
                  {selectedItem.date}
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button
                onClick={() => handleStatusToggle(selectedItem.id)}
                className="btn-secondary"
              >
                {selectedItem.status === 'lost' ? '💎 찾았어요!' : '🔍 찾는 중'}
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="btn-primary"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
