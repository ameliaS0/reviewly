import { useEffect, useRef, useState, useCallback } from 'react'
import { getProducts, createProduct, deleteProduct, updateProduct } from '../../api'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import Cropper from 'react-easy-crop'
import { Image, Search, X, Pencil, Trash2 } from 'lucide-react'
import './Products.css'

const CATEGORIES = ['Audio', 'Sport', 'Maison', 'Informatique', 'Mode', 'Autre']
const CATEGORY_COLORS = {
  Audio: '#6ee7b7', Sport: '#60a5fa', Maison: '#f9a8d4',
  Informatique: '#a78bfa', Mode: '#fbbf24', Autre: '#94a3b8'
}

/*decoupe l'image sélectionnée selon la zone d'affichage
retourne un Blob (fichier image prêt à être envoyé au backend)*/
async function getCroppedBlob(imageSrc, croppedAreaPixels) {
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = imageSrc
  })
  const canvas = document.createElement('canvas')
  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image,
    croppedAreaPixels.x, croppedAreaPixels.y,
    croppedAreaPixels.width, croppedAreaPixels.height,
    0, 0, croppedAreaPixels.width, croppedAreaPixels.height
  )
  return new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.92))
}

//permet à l'utilisateur de zoomer et recadrer l'image
function ImageCropper({ src, onDone, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const onCropComplete = useCallback((_, cap) => setCroppedAreaPixels(cap), [])

  const handleConfirm = async () => {
    const blob = await getCroppedBlob(src, croppedAreaPixels)
    const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' })
    onDone(file, URL.createObjectURL(blob))
  }

  return (
    <div className="cropper-overlay">
      <p className="cropper-title">Recadrer l'image</p>
      <div className="cropper-container">
        <Cropper
          image={src} crop={crop} zoom={zoom} aspect={4/3}
          onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete}
        />
      </div>
      <div className="cropper-zoom-row">
        <span className="cropper-zoom-label">Zoom</span>
        <input
          type="range" min={1} max={3} step={0.01}
          value={zoom} onChange={e => setZoom(Number(e.target.value))}
          className="cropper-zoom-slider"
        />
      </div>
      <div className="cropper-actions">
        <button onClick={onCancel} className="btn btn-ghost">Annuler</button>
        <button onClick={handleConfirm} className="btn btn-accent">Confirmer le recadrage</button>
      </div>
    </div>
  )
}

//lance automatiquement le recadrage
function ImageUploadZone({ preview, onFile }) {
  const inputRef = useRef()
  const [dragging, setDragging] = useState(false)
  const [cropSrc, setCropSrc] = useState(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && ['image/png', 'image/jpeg'].includes(file.type))
      setCropSrc(URL.createObjectURL(file))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) setCropSrc(URL.createObjectURL(file))
    e.target.value = ''
  }

  return (
    <>
      {/*affiche le recadreur*/}
      {cropSrc && (
        <ImageCropper
          src={cropSrc}
          onDone={(file, preview) => { setCropSrc(null); onFile(file, preview) }}
          onCancel={() => setCropSrc(null)}
        />
      )}
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`image-upload-zone${dragging ? ' dragging' : ''}`}
        style={{ border: `1px dashed ${dragging ? 'var(--accent)' : 'var(--border-hover)'}` }}
      >
        {preview ? (
          <>
            <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="image-upload-hover-overlay">
              <span className="image-upload-hover-text">Changer l'image</span>
            </div>
          </>
        ) : (
          <>
            <Image size={20} stroke="var(--text-3)" strokeWidth={1.5} />
            <span className="image-upload-hint">
              Glissez une image ou cliquez<br />
              <span className="image-upload-hint-accent">PNG, JPEG</span>
            </span>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/png,image/jpeg"
          style={{ display: 'none' }} onChange={handleFileChange} />
      </div>
    </>
  )
}

/*contenu partagé entre le formulaire d'ajout et le formulaire de modification*/
function FormContent({ name, setName, category, setCategory, imagePreview, onImageFile, onRemoveImage, error, loading, onSubmit, onCancel, submitLabel }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ImageUploadZone preview={imagePreview} onFile={onImageFile} />
      {imagePreview && (
        <button onClick={onRemoveImage} className="btn btn-ghost btn-sm"
          style={{ alignSelf: 'flex-start' }} type="button">
          Retirer l'image
        </button>
      )}
      <div className="form-field">
        <label className="form-label">Nom du produit</label>
        <input type="text" placeholder="Ex: Sony WH-1000XM5"
          value={name} onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
          className="input" autoFocus />
      </div>
      <div className="form-field">
        <label className="form-label">Catégorie</label>
        <select value={category} onChange={e => setCategory(e.target.value)} className="input">
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {error && <p style={{ color: 'var(--red)', fontSize: '12px' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
        <button onClick={onCancel} className="btn btn-ghost" type="button">Annuler</button>
        <button onClick={onSubmit} disabled={loading} className="btn btn-accent" type="button">
          {loading ? 'Enregistrement...' : submitLabel}
        </button>
      </div>
    </div>
  )
}

/*modale générique réutilisée pour l'ajout et la modification de produit*/
function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="card modal-box">
        <div className="modal-header">
          <p className="modal-title">{title}</p>
          <button onClick={onClose} className="btn btn-ghost btn-sm" type="button">
            <X size={14} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/*cartes des produits */
function ProductCard({ product, onDetail, onDelete, onEdit }) {
  const accentColor = CATEGORY_COLORS[product.category] || '#94a3b8'
  const hasReviews = product.review_count > 0

  return (
    <div className="card product-card fade-up">
      <div
        className="product-card-image"
        onClick={() => onDetail(product)}
        style={{ background: product.image ? 'transparent' : `linear-gradient(135deg, ${accentColor}10, ${accentColor}05)` }}
      >
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          /*si le produit n'a pas d'images */
          <Image size={36} stroke={`${accentColor}40`} strokeWidth={1} />
        )}
        <div
          className="product-card-badge-category"
          style={{ border: `1px solid ${accentColor}40`, color: accentColor }}
        >
          {product.category}
        </div>
        {hasReviews && (
          <div className="product-card-badge-rating">
            <span className="product-card-badge-rating-star">★</span>
            <span className="product-card-badge-rating-value">{product.average_rating}</span>
          </div>
        )}
      </div>

      <div className="product-card-body">
        <div onClick={() => onDetail(product)}>
          <p className="product-card-name">{product.name}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {hasReviews ? (
              <>
                <div className="product-card-stars">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} style={{ fontSize: '13px', color: n <= Math.round(product.average_rating) ? 'var(--yellow)' : 'var(--border-hover)' }}>★</span>
                  ))}
                </div>
                <span className="product-card-meta">
                  {product.average_rating} · {product.review_count} avis
                </span>
              </>
            ) : (
              <span className="product-card-no-reviews">Aucun avis</span>
            )}
          </div>
          {/* répartition positif / neutre / négatif */}
          {hasReviews && (
            <div className="product-card-sentiment-bar">
              {product.sentiments.positif > 0 && <div style={{ flex: product.sentiments.positif, background: 'var(--green)', borderRadius: '2px' }} />}
              {product.sentiments.neutre > 0 && <div style={{ flex: product.sentiments.neutre, background: 'var(--yellow)', borderRadius: '2px' }} />}
              {product.sentiments['négatif'] > 0 && <div style={{ flex: product.sentiments['négatif'], background: 'var(--red)', borderRadius: '2px' }} />}
            </div>
          )}
        </div>

        <div className="product-card-actions">
          <button onClick={() => onDetail(product)} className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Voir</button>
          <button onClick={() => onEdit(product)} className="btn btn-ghost btn-sm">
            <Pencil size={13} />
          </button>
          <button onClick={() => onDelete(product)} className="btn btn-danger btn-sm">
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Products({ onDetail, addToast }) {
  const [products, setProducts] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [removeImageOnSave, setRemoveImageOnSave] = useState(false)
  const [filterCategory, setFilterCategory] = useState('Tous')
  const [sortBy, setSortBy] = useState('date')
  const [search, setSearch] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Audio')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /*chargement de tous les produit depuis le backend */
  const fetchProducts = async () => {
    try {
      const res = await getProducts()
      setProducts(res.data)
    } catch(e) {
      console.error(e)
      addToast('Erreur lors du chargement', 'error')
    }
  }

  useEffect(() => { fetchProducts() }, [])

  /*réinitialise tous les champs du formulaire*/
  const resetForm = () => {
    setName(''); setCategory('Audio'); setImageFile(null)
    setImagePreview(null); setRemoveImageOnSave(false); setError('')
  }

  const handleImageFile = (file, preview) => {
    setImageFile(file)
    setImagePreview(preview || URL.createObjectURL(file))
    setRemoveImageOnSave(false)
  }

  const handleRemoveImage = () => {
    setImageFile(null); setImagePreview(null); setRemoveImageOnSave(true)
  }

  /*si un nouveau produit a était ajouter on l'envoie au back 
  puis on refresh la liste */
  const handleAdd = async () => {
    if (!name.trim()) return setError('Le nom est requis.')
    setLoading(true); setError('')
    try {
      const fd = new FormData()
      fd.append('name', name); fd.append('category', category)
      if (imageFile) fd.append('image', imageFile)
      await createProduct(fd)
      resetForm(); setShowAddModal(false)
      await fetchProducts()
      addToast('Produit ajouté avec succès ✓')
    } catch(e) {
      console.error(e)
      setError('Erreur lors de la création.')
      addToast('Erreur lors de la création', 'error')
    }
    setLoading(false)
  }

  /*envoie les modifications au backend
  */
  const handleEdit = async () => {
    if (!name.trim()) return setError('Le nom est requis.')
    setLoading(true); setError('')
    try {
      const fd = new FormData()
      fd.append('name', name); fd.append('category', category)
      if (removeImageOnSave) fd.append('remove_image', 'true')
      else if (imageFile) fd.append('image', imageFile)
      await updateProduct(editProduct.id, fd)
      resetForm(); setEditProduct(null)
      await fetchProducts()
      addToast('Produit modifié ✓')
    } catch(e) {
      console.error(e)
      setError('Erreur lors de la modification.')
      addToast('Erreur lors de la modification', 'error')
    }
    setLoading(false)
  }

  /*pré-remplit le formulaire avec les données du produit à modifier*/
  const openEdit = (product) => {
    setName(product.name); setCategory(product.category)
    setImagePreview(product.image || null); setImageFile(null)
    setRemoveImageOnSave(false); setError(''); setEditProduct(product)
  }

  const handleDeleteConfirmed = async () => {
    try {
      await deleteProduct(confirmDelete.id)
      setConfirmDelete(null)
      await fetchProducts()
      addToast('Produit supprimé', 'error')
    } catch(e) {
      console.error(e)
      addToast('Erreur lors de la suppression', 'error')
    }
  }

  /*filtres (catégorie + recherche) et le tri sur la liste des produits*/
  const filteredProducts = products
    .filter(p => filterCategory === 'Tous' || p.category === filterCategory)
    .filter(p => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return (b.average_rating || 0) - (a.average_rating || 0)
      if (sortBy === 'reviews') return (b.review_count || 0) - (a.review_count || 0)
      return new Date(b.created_at) - new Date(a.created_at)
    })

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <p className="mono" style={{ color: 'var(--accent)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Catalogue</p>
          <h1 className="display products-title">Produits</h1>
          <p className="products-subtitle">{filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => { resetForm(); setShowAddModal(true) }} className="btn btn-accent">+ Nouveau produit</button>
      </div>

      {/*barre de recherche */}
      <div className="products-search-wrapper">
        <Search className="products-search-icon" size={15} />
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="products-search-input"
        />
        {search && (
          <button className="products-search-clear" onClick={() => setSearch('')}>
            <X size={13} />
          </button>
        )}
      </div>

      {/*filtres par catégorie et tri */}
      <div className="products-filters">
        <div className="products-filter-group">
          {['Tous', ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)}
              className={`filter-pill${filterCategory === cat ? ' active-category' : ''}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="products-filter-divider" />
        <div className="products-filter-group">
          {[{ key: 'date', label: 'Récent' }, { key: 'rating', label: '⭐ Rating' }, { key: 'reviews', label: 'Avis' }].map(s => (
            <button key={s.key} onClick={() => setSortBy(s.key)}
              className={`filter-pill${sortBy === s.key ? ' active-sort' : ''}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/*message vid selon le contexte: recherche, catégorie ou liste vide */}
      {filteredProducts.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">
            <Search size={18} strokeWidth={1.5} />
          </div>
          {search ? `Aucun résultat pour "${search}"` : products.length === 0 ? 'Aucun produit. Ajoutez-en un pour commencer.' : 'Aucun produit dans cette catégorie.'}
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 0.05}s` }}>
              <ProductCard product={p} onDetail={onDetail} onDelete={p => setConfirmDelete(p)} onEdit={openEdit} />
            </div>
          ))}
        </div>
      )}

      {/*ajouter produit */}
      {showAddModal && (
        <Modal title="Nouveau produit" onClose={() => { resetForm(); setShowAddModal(false) }}>
          <FormContent name={name} setName={setName} category={category} setCategory={setCategory}
            imagePreview={imagePreview} onImageFile={handleImageFile} onRemoveImage={handleRemoveImage}
            error={error} loading={loading} onSubmit={handleAdd}
            onCancel={() => { resetForm(); setShowAddModal(false) }} submitLabel="Ajouter" />
        </Modal>
      )}

      {/* =
      modif profyis */}
      {editProduct && (
        <Modal title="Modifier le produit" onClose={() => { resetForm(); setEditProduct(null) }}>
          <FormContent name={name} setName={setName} category={category} setCategory={setCategory}
            imagePreview={imagePreview} onImageFile={handleImageFile} onRemoveImage={handleRemoveImage}
            error={error} loading={loading} onSubmit={handleEdit}
            onCancel={() => { resetForm(); setEditProduct(null) }} submitLabel="Enregistrer" />
        </Modal>
      )}

      {/*confirmations pour suprimer definitivement */}
      {confirmDelete && (
        <ConfirmModal
          message={`Supprimer "${confirmDelete.name}" et tous ses avis ?`}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}