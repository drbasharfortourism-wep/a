// انتظار تحميل DOM بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // تبديل القائمة في الشاشات الصغيرة
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // الشريط العلوي يظل ثابتًا دون تغيير عند التمرير
    // تم إزالة كود تغيير شكل الهيدر عند التمرير للحفاظ على ثباته

    // التمرير السلس إلى الأقسام
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });

                // إغلاق القائمة في الشاشات الصغيرة بعد النقر
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // تفعيل معرض الصور
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.getAttribute('src');

            // إنشاء نافذة منبثقة لعرض الصورة
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="صورة مكبرة">
                </div>
            `;

            // إضافة النافذة المنبثقة إلى الصفحة
            document.body.appendChild(modal);

            // إظهار النافذة المنبثقة
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);

            // إغلاق النافذة المنبثقة عند النقر على زر الإغلاق
            const closeModal = document.querySelector('.close-modal');
            closeModal.addEventListener('click', function() {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });

            // إغلاق النافذة المنبثقة عند النقر خارج الصورة
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                }
            });
        });
    });

    // تفعيل معرض الفيديوهات
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const videoTitle = this.nextElementSibling.textContent;

            // إنشاء نافذة منبثقة لعرض الفيديو
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>${videoTitle}</h3>
                    <div class="video-container">
                        <iframe src="https://www.tiktok.com/embed/v2" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            `;

            // إضافة النافذة المنبثقة إلى الصفحة
            document.body.appendChild(modal);

            // إظهار النافذة المنبثقة
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);

            // إغلاق النافذة المنبثقة عند النقر على زر الإغلاق
            const closeModal = document.querySelector('.close-modal');
            closeModal.addEventListener('click', function() {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });

            // إغلاق النافذة المنبثقة عند النقر خارج الفيديو
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                }
            });
        });
    });

    // تفعيل نموذج آراء العملاء
    const testimonialForm = document.querySelector('.testimonial-form form');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // الحصول على بيانات النموذج
            const name = document.querySelector('.testimonial-form input[type="text"]').value;
            const email = document.querySelector('.testimonial-form input[type="email"]').value;
            const message = document.querySelector('.testimonial-form textarea').value;

            // التحقق من البيانات
            if (!name || !email || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            // إنشاء بطاقة رأي جديد
            const newTestimonial = document.createElement('div');
            newTestimonial.className = 'testimonial-card';
            newTestimonial.innerHTML = `
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p>"${message}"</p>
                <div class="client-info">
                    <img src="https://picsum.photos/seed/${name}/50/50.jpg" alt="${name}">
                    <h4>${name}</h4>
                </div>
            `;

            // إضافة البطاقة الجديدة إلى معرض آراء العملاء
            const testimonialsSlider = document.querySelector('.testimonials-slider');
            testimonialsSlider.insertBefore(newTestimonial, testimonialsSlider.firstChild);

            // إظهار رسالة نجاح
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'تم إرسال رأيك بنجاح! شكراً لك.';
            successMessage.style.cssText = `
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #4CAF50;
                color: white;
                padding: 15px 30px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                z-index: 1001;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            document.body.appendChild(successMessage);

            // إظهار رسالة النجاح
            setTimeout(() => {
                successMessage.style.opacity = '1';
            }, 10);

            // إخفاء رسالة النجاح بعد 3 ثوانٍ
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 300);
            }, 3000);

            // إعادة تعيين النموذج
            testimonialForm.reset();
        });
    }

    // إضافة تأثيرات التمرير
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .destination-card, .gallery-item, .video-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // إعداد العناصر للتحريك
    const setupAnimation = function() {
        const elements = document.querySelectorAll('.feature-card, .destination-card, .gallery-item, .video-item');

        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        });

        // تشغيل التحريك عند التمرير
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // تشغيله مرة واحدة عند تحميل الصفحة
    };

    // تشغيل إعداد التحريك
    setupAnimation();
});
