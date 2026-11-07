document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year for Footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Translations Dictionary
    const translations = {
        en: {
            pageTitle: "Awab | Python Programmer",
            avatar: "A",
            name: "Awab",
            tagline: "Python Programmer | Build practical tools",
            projectsTitle: "My Projects",
            calcTitle: "OAP Calc",
            calcDesc: "Smart Calculator built in Python.",
            downloadBtn: "Download Project",
            detailsBtn: "View Details",
            contactTitle: "Contact Me",
            footerText: "Awab. All rights reserved.",
            modalTitle: "Details: OAP Calc",
            modalDesc: "A lightweight, fast desktop calculator app developed using Python GUI with custom UI and icons.",
            langLabel: "Language:",
            uiLabel: "GUI Framework:",
            featuresLabel: "Features:",
            featuresVal: "Dark theme, custom icon, responsive performance",
            downloadMsg: "Preparing download link for "
        },
        ar: {
            pageTitle: "أواب | مبرمج بايثون",
            avatar: "أ",
            name: "أواب",
            tagline: "مبرمج بايثون | ببني أدوات عملية",
            projectsTitle: "مشاريعي",
            calcTitle: "OAP Calc",
            calcDesc: "حاسبة ذكية مبنية بلغة بايثون.",
            downloadBtn: "تحميل المشروع",
            detailsBtn: "عرض التفاصيل",
            contactTitle: "تواصل معي",
            footerText: "أواب. جميع الحقوق محفوظة.",
            modalTitle: "تفاصيل: OAP Calc",
            modalDesc: "برنامج حاسبة مكتبي خفيف وسريع تم تطويره بلغة بايثون واجهة مستخدم رسومية (GUI) مع تصاميم وأيقونة مخصصة.",
            langLabel: "اللغة:",
            uiLabel: "الواجهة:",
            featuresLabel: "المميزات:",
            featuresVal: "تصميم مظلم، أيقونة مخصصة، سرعة استجابة",
            downloadMsg: "جارٍ تحضير رابط تحميل "
        }
    };

    let currentLang = localStorage.getItem('lang') || 'en';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Update button text to switch option
        const langLabel = document.getElementById('lang-label');
        if (langLabel) {
            langLabel.textContent = lang === 'en' ? 'عربي' : 'EN';
        }

        // Apply translations
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update project data attribute for download alert
        const calcDownloadBtn = document.querySelector('.btn-download[data-modal="modal-calculator"]');
        if (calcDownloadBtn) {
            calcDownloadBtn.setAttribute('data-project', translations[lang].calcTitle);
        }
    }

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    }

    // Initialize Language
    setLanguage(currentLang);

    // Modal Handling for Project Details
    const modalButtons = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('[data-close]');

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Close Modal on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                activeModal.setAttribute('aria-hidden', 'true');
            }
        }
    });

    // Download Button Action (Placeholder handler)
    const downloadBtns = document.querySelectorAll('.btn-download');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectName = btn.getAttribute('data-project');
            // If href is '#', show alert for demonstration
            if (btn.getAttribute('href') === '#') {
                e.preventDefault();
                const prefix = translations[currentLang].downloadMsg;
                alert(`${prefix}${projectName}...`);
            }
        });
    });
});
