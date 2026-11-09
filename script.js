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
            freeProjectsTitle: "Free Projects",
            paidProjectsTitle: "Projects for Sale",
            calcTitle: "OAP Calc",
            calcDesc: "Smart Calculator built in Python.",
            downloadBtn: "Free Download",
            tryOnlineBtn: "Try Online",
            detailsBtn: "View Details",
            paidProjectTitle: "Custom Desktop Application",
            paidProjectDesc: "High-performance Python application with sleek UI, database integration, and automated workflows.",
            orderWhatsappBtn: "Order Full Version - WhatsApp",
            contactTitle: "Contact Me",
            footerText: "Awab. All rights reserved.",
            modalTitle: "Details: OAP Calc",
            modalDesc: "A lightweight, fast desktop calculator app developed using Python GUI with custom UI and icons.",
            langLabel: "Language:",
            uiLabel: "GUI Framework:",
            featuresLabel: "Features:",
            featuresVal: "Dark theme, custom icon, responsive performance",
            downloadMsg: "Preparing download link for ",
            calcModalTitle: "OAP Calc Online"
        },
        ar: {
            pageTitle: "أواب | مبرمج بايثون",
            avatar: "أ",
            name: "أواب",
            tagline: "مبرمج بايثون | ببني أدوات عملية",
            projectsTitle: "مشاريعي",
            freeProjectsTitle: "مشاريع مجانية",
            paidProjectsTitle: "مشاريع للبيع",
            calcTitle: "OAP Calc",
            calcDesc: "حاسبة ذكية مبنية بلغة بايثون.",
            downloadBtn: "تحميل مجاني",
            tryOnlineBtn: "جرب في الموقع",
            detailsBtn: "عرض التفاصيل",
            paidProjectTitle: "تطبيق مكتبي متكامل",
            paidProjectDesc: "برنامج متقدم وعالي الأداء تم تطويره بلغة بايثون مع واجهة عصرية ورائعة ورربط مع قواعد البيانات.",
            orderWhatsappBtn: "اطلب النسخة الكاملة - واتساب",
            contactTitle: "تواصل معي",
            footerText: "أواب. جميع الحقوق محفوظة.",
            modalTitle: "تفاصيل: OAP Calc",
            modalDesc: "برنامج حاسبة مكتبي خفيف وسريع تم تطويره بلغة بايثون واجهة مستخدم رسومية (GUI) مع تصاميم وأيقونة مخصصة.",
            langLabel: "اللغة:",
            uiLabel: "الواجهة:",
            featuresLabel: "المميزات:",
            featuresVal: "تصميم مظلم، أيقونة مخصصة، سرعة استجابة",
            downloadMsg: "جارٍ تحضير رابط تحميل ",
            calcModalTitle: "حاسبة OAP مباشرة"
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

    // Interactive Calculator Logic
    const calcDisplay = document.getElementById('calc-display');
    const calcButtons = document.querySelectorAll('.calc-btn');

    if (calcDisplay && calcButtons.length > 0) {
        let currentInput = '0';
        let shouldResetDisplay = false;

        function updateDisplay() {
            calcDisplay.value = currentInput;
        }

        calcButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                const value = button.getAttribute('data-value');

                if (action === 'clear') {
                    currentInput = '0';
                    shouldResetDisplay = false;
                } else if (action === 'delete') {
                    if (currentInput.length > 1) {
                        currentInput = currentInput.slice(0, -1);
                    } else {
                        currentInput = '0';
                    }
                } else if (action === 'sqrt') {
                    try {
                        const val = parseFloat(currentInput);
                        currentInput = String(Math.sqrt(val));
                    } catch { currentInput = 'Error'; }
                    shouldResetDisplay = true;
                } else if (action === 'sin') {
                    try {
                        const val = parseFloat(currentInput);
                        currentInput = String(Math.sin(val * (Math.PI / 180)));
                    } catch { currentInput = 'Error'; }
                    shouldResetDisplay = true;
                } else if (action === 'cos') {
                    try {
                        const val = parseFloat(currentInput);
                        currentInput = String(Math.cos(val * (Math.PI / 180)));
                    } catch { currentInput = 'Error'; }
                    shouldResetDisplay = true;
                } else if (action === 'tan') {
                    try {
                        const val = parseFloat(currentInput);
                        currentInput = String(Math.tan(val * (Math.PI / 180)));
                    } catch { currentInput = 'Error'; }
                    shouldResetDisplay = true;
                } else if (action === 'calculate') {
                    try {
                        // Replace display symbols with JS math operators
                        let expression = currentInput
                            .replace(/×/g, '*')
                            .replace(/÷/g, '/')
                            .replace(/π/g, 'Math.PI')
                            .replace(/\^/g, '**');
                        // Evaluate expression safely
                        const result = Function(`'use strict'; return (${expression})`)();
                        currentInput = String(Number.isFinite(result) ? result : 'Error');
                    } catch (err) {
                        currentInput = 'Error';
                    }
                    shouldResetDisplay = true;
                } else if (value) {
                    const isOperator = ['+', '-', '*', '/', '×', '÷'].includes(value);

                    if (currentInput === '0' || currentInput === 'Error' || shouldResetDisplay) {
                        if (isOperator && currentInput !== 'Error') {
                            currentInput += value;
                        } else {
                            currentInput = value;
                        }
                        shouldResetDisplay = false;
                    } else {
                        // Prevent consecutive operators
                        const lastChar = currentInput.slice(-1);
                        if (isOperator && ['+', '-', '*', '/', '×', '÷'].includes(lastChar)) {
                            currentInput = currentInput.slice(0, -1) + value;
                        } else {
                            currentInput += value;
                        }
                    }
                }
                updateDisplay();
            });
        });
    }
});
