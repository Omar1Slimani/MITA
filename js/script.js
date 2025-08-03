// Enhanced Cart functionality
let cart = [];
let cartCount = 0;

function addToCart(productName, price) {
    cart.push({name: productName, price: price});
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;
    
    // Enhanced success message with animation
    showNotification(`تم إضافة ${productName} إلى السلة بنجاح!`, 'success');
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4CAF50, #45a049)' : 'linear-gradient(45deg, #2196F3, #1976D2)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: bold;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Enhanced header scroll behavior
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on links
navLinks.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    }
});

// Enhanced form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    
    // Add loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification(`شكراً لك ${name}! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.`, 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Enhanced smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        }
    });
}

// Enhanced cart checkout
function processOrder() {
    if (cart.length === 0) {
        showNotification('السلة فارغة! يرجى إضافة منتجات أولاً.', 'info');
        return;
    }
    
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    let orderSummary = 'ملخص الطلب:\n';
    cart.forEach(item => {
        orderSummary += `- ${item.name}: ${item.price.toLocaleString()} ريال\n`;
    });
    orderSummary += `\nالإجمالي: ${totalPrice.toLocaleString()} ريال`;
    
    showNotification('شكراً لطلبك! سنتواصل معك لتأكيد الطلب.', 'success');
    
    // Clear cart with animation
    setTimeout(() => {
        cart = [];
        cartCount = 0;
        const cartCountElement = document.getElementById('cartCount');
        cartCountElement.style.transform = 'scale(1.5)';
        cartCountElement.textContent = cartCount;
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    }, 1000);
}

// Cart icon click handler
document.getElementById('cartIcon').addEventListener('click', function(e) {
    e.preventDefault();
    if (cartCount > 0) {
        processOrder();
    } else {
        showNotification('السلة فارغة!', 'info');
    }
});

// Loading screen
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hide');
    }, 1000);
});

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
});

// Enhanced hover effects for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Enhanced search functionality (if needed)
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            input.style.borderColor = '#4CAF50';
        }
    });
    
    return isValid;
}

// Enhanced product filtering
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all') {
            product.style.display = 'block';
        } else {
            const productTitle = product.querySelector('.product-title').textContent.toLowerCase();
            if (productTitle.includes(category.toLowerCase())) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        }
    });
}

// Enhanced price formatting
function formatPrice(price) {
    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR'
    }).format(price);
}

// Enhanced localStorage functionality for cart persistence
function saveCartToStorage() {
    localStorage.setItem('woodFurnitureCart', JSON.stringify(cart));
    localStorage.setItem('woodFurnitureCartCount', cartCount.toString());
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('woodFurnitureCart');
    const savedCount = localStorage.getItem('woodFurnitureCartCount');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    if (savedCount) {
        cartCount = parseInt(savedCount);
        document.getElementById('cartCount').textContent = cartCount;
    }
}

// Enhanced product comparison
let compareList = [];

function addToCompare(productName, price) {
    if (compareList.length < 3 && !compareList.find(item => item.name === productName)) {
        compareList.push({name: productName, price: price});
        showNotification(`تم إضافة ${productName} للمقارنة`, 'info');
    } else if (compareList.length >= 3) {
        showNotification('يمكنك مقارنة 3 منتجات كحد أقصى', 'info');
    } else {
        showNotification('المنتج موجود بالفعل في المقارنة', 'info');
    }
}

// Enhanced wishlist functionality
let wishlist = [];

function addToWishlist(productName, price) {
    if (!wishlist.find(item => item.name === productName)) {
        wishlist.push({name: productName, price: price});
        showNotification(`تم إضافة ${productName} لقائمة الأمنيات`, 'success');
    } else {
        showNotification('المنتج موجود بالفعل في قائمة الأمنيات', 'info');
    }
}

// Enhanced product rating system
function rateProduct(productName, rating) {
    const ratings = JSON.parse(localStorage.getItem('productRatings')) || {};
    ratings[productName] = rating;
    localStorage.setItem('productRatings', JSON.stringify(ratings));
    showNotification(`تم تقييم ${productName} بـ ${rating} نجوم`, 'success');
}

// Enhanced error handling
function handleError(error, context) {
    console.error(`خطأ في ${context}:`, error);
    showNotification(`حدث خطأ: ${error.message}`, 'error');
}

// Enhanced performance monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Load cart from storage
        loadCartFromStorage();
        
        // Initialize animations
        animateOnScroll();
        
        // Add event listeners
        setupEventListeners();
        
        console.log('موقع الأثاث الخشبي تم تحميله بنجاح');
    } catch (error) {
        handleError(error, 'تحميل الموقع');
    }
});

function setupEventListeners() {
    // Update cart storage when items are added
    const originalAddToCart = addToCart;
    addToCart = function(productName, price) {
        originalAddToCart(productName, price);
        saveCartToStorage();
    };
}