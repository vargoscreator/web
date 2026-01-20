
    const bottomInner = document.querySelector('.header__bottom-inner');
    const headerContent = document.querySelector('.header__content');
    const headerBottom = document.querySelector('.header__bottom .container');
    function handleHeaderLayout() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 769) {
            if (!headerContent.contains(bottomInner)) {
                headerContent.appendChild(bottomInner);
            }
        } else {
            if (headerContent.contains(bottomInner)) {
                headerBottom.appendChild(bottomInner);
            }
        }
    }
    handleHeaderLayout();
    window.addEventListener('resize', handleHeaderLayout);

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add({
  isDesktop: "(min-width: 769px)",
  isMobile: "(max-width: 768px)"
}, (context) => {
  let { isDesktop } = context.conditions;

  const animation = initStepsAnimation({
    pin: isDesktop,
    endMultiplier: isDesktop ? 2.5 : 1.5,
    start: isDesktop ? "top top" : "top 200px" 
  });

  return () => {
    if (animation) {
      animation.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    }
  };
});

function initStepsAnimation({ pin, endMultiplier, start }) {
  const section = document.querySelector(".steps");
  const path = document.getElementById("stepsPath");
  const items = document.querySelectorAll(".steps__item");

  if (!section || !path) return;

  gsap.killTweensOf([path, items]);

  const pathLength = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: -pathLength
  });
  gsap.set(items, { opacity: 0.4 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: start,
      end: () => "+=" + (window.innerHeight * endMultiplier),
      scrub: 1,
      pin: pin,
      pinSpacing: pin,
      invalidateOnRefresh: true,

    }
  });

  tl.to(path, {
    strokeDashoffset: 0,
    ease: "none"
  });

  items.forEach((item, i) => {
    tl.to(item, {
      opacity: 1,
      duration: 0.25,
      ease: "none"
    }, i * (1 / items.length));
  });

  return tl;
}
window.addEventListener("load", () => {
    ScrollTrigger.refresh(); 
});

if(document.querySelector('.blog__slide-inner')){
    let swiper = new Swiper(".blog__slider", {
        loop: true,
        spaceBetween: 0,
        slidesPerView: 1,
        allowTouchMove: true,
        speed: 800, // плавная прокрутка
        // navigation: {
        //     nextEl: ".button-next",
        //     prevEl: ".button-prev",
        // },
        pagination: {
            el: ".blog__slider-pagination",
            clickable: true,
        },
        // breakpoints: {
        //     775: {
        //         spaceBetween: 30,
        //         slidesPerView: 3,
        //     },
        //     931: {
        //         spaceBetween: 30,
        //         slidesPerView: 4,
        //     },
        // },
    });

    function animateSlide(slide) {
        const inner = slide.querySelector(".blog__slide-inner");
        if (!inner) return;
        gsap.set(inner, {opacity: 0, y: 50});
        gsap.to(inner, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1
        });
    }
    animateSlide(swiper.slides[swiper.activeIndex]);
    swiper.on('slideChange', () => {
        const currentSlide = swiper.slides[swiper.activeIndex];
        animateSlide(currentSlide);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const burger = document.querySelector('.header__burger');
    const themeBtn = document.querySelector('.header__change');
    burger.addEventListener('click', () => {
        header.classList.toggle('header-show-menu');
    });
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('theme-white');
        document.documentElement.classList.toggle('theme-white');
    });
    function handleScroll() {
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact__feedback-form');
    const popup = document.querySelector('.popup-sended');
    const popupInner = document.querySelector('.popup-sended__inner');
    const closeBtn = document.querySelector('.popup-sended__close');
    if (!form || !popup) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        popup.classList.add('active');
    });
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });
    popup.addEventListener('click', (e) => {
        if (!popupInner.contains(e.target)) {
            popup.classList.remove('active');
        }
    });
});

if(document.querySelector('.blogs__filter')){
    const filter = document.querySelector('.blogs__filter');
    const filterOpenBtn = document.querySelector('.blogs__filter-open');
    const filterContent = document.querySelector('.blogs__filter-content');
    filterOpenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filter.classList.toggle('active');
    });
    filterContent.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT') {
            filter.classList.remove('active');
        }
    });
    document.addEventListener('click', (e) => {
        if (!filter.contains(e.target)) {
            filter.classList.remove('active');
        }
    });
}


gsap.registerPlugin(ScrollTrigger);
window.addEventListener('load', () => {
    gsap.from(".header__top-inner, .header__bottom-inner", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    });
    gsap.from(".errorpage__name", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
    gsap.from(".errorpage__title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });
    gsap.from(".errorpage__descr", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4
    });
    gsap.from(".errorpage__btn", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6
    });
    gsap.from(".footer__top, .footer__bottom", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3
    });
});
gsap.utils.toArray(".errorpage__inner, .footer__inner").forEach((section) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});
gsap.from(".contact__start-inner", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".contact__start-inner",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});
gsap.from(".contact__feedback", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".contact__feedback",
        start: "top 80%"
    }
});
gsap.utils.toArray(".contact__feedback-form .form-input, .contact__feedback-form .form-checkbox, .contact__feedback-form .form-btn").forEach((el, i) => {
    gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.15,
        scrollTrigger: {
            trigger: ".contact__feedback-form",
            start: "top 85%"
        }
    });
});
gsap.from(".contact__image", {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".contact__image",
        start: "top 80%"
    }
});
gsap.from(".contact__info", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".contact__info",
        start: "top 80%"
    }
});
gsap.utils.toArray(".contact__info a, .contact__info p, .contact__social").forEach((el, i) => {
    gsap.from(el, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.15,
        scrollTrigger: {
            trigger: el,
            start: "top 90%"
        }
    });
});
gsap.from(".blog__top > *", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".blog__top",
        start: "top 80%"
    }
});
gsap.from(".blog__slide-inner > *", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".blog__slider",
        start: "top 75%"
    }
});
gsap.from(".blogs__filter", {
    x: -60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".blogs__filter",
        start: "top 80%"
    }
});
gsap.utils.toArray(".blogs__item").forEach(item => {
    gsap.from(item, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none", 
        }
    });
});

gsap.from(".blogs__pages", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".blogs__pages",
        start: "top 90%"
    }
});
gsap.from(".partner__inner > *", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".partner",
        start: "top 80%"
    }
});
gsap.from(".support__title", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".support",
        start: "top 80%"
    }
});
gsap.from(".support__item", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
        trigger: ".support__block",
        start: "top 85%"
    }
});
gsap.from(".article__inner", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".article",
        start: "top 80%"
    }
});

gsap.from(".certificates__mobile-slider", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".certificates__inner",
        start: "top 80%"
    }
});

gsap.from(".about__title span", {
    scrollTrigger: {
        trigger: ".about__inner",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".about__content h3, .about__content p, .about__btn", {
    scrollTrigger: {
        trigger: ".about__content",
        start: "top 85%",
        toggleActions: "play none none none" 
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".mission__start h2, .mission__start h3", {
    scrollTrigger: {
        trigger: ".mission__inner",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".mission__images img, .mission__descr", {
    scrollTrigger: {
        trigger: ".mission__images",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".worth__start h2, .worth__start h3", {
    scrollTrigger: {
        trigger: ".worth__inner",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".worth__item, .worth__item-image", {
    scrollTrigger: {
        trigger: ".worth__block",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".history__start h2, .history__start h3", {
    scrollTrigger: {
        trigger: ".history__inner",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".history__slide-image, .history__slide-content h3, .history__slide-content p, .history__slide-btn", {
    scrollTrigger: {
        trigger: ".history__content",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".certificates__start h2, .certificates__start h3", {
    scrollTrigger: {
        trigger: ".certificates__inner",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".certificates__slider, .certificates__name, .certificates__slider-buttons", {
    scrollTrigger: {
        trigger: ".certificates__box",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});


    const rbtTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".rbt",
            start: "top 80%",
        }
    });
    rbtTl.from(".rbt__start-name, .rbt__start-title", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    })
    .from(".rbt__image", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.5")
    .from(".rbt__info > *", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.8");

    gsap.from(".advantages__start-name, .advantages__start-title", {
        scrollTrigger: {
            trigger: ".advantages",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
    });

    const advTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".advantages__box",
            start: "top 75%",
        }
    });
    advTl.from(".advantages__block:first-child .advantages__name", {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6
    })
    .from(".advantages__center span", {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4
    }, "-=0.5")
    .from(".advantages__block:last-child .advantages__name", {
        x: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6
    }, "-=0.8");

    gsap.from(".examples__start > *", {
        scrollTrigger: {
            trigger: ".examples",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2
    });

    gsap.to(".examples__animate-wrapper", {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1
    });

    gsap.from(".examples__slide", {
        scrollTrigger: {
            trigger: ".examples__slider",
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".requirements__start > *", {
        scrollTrigger: {
            trigger: ".requirements",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2
    });

    gsap.utils.toArray(".requirements__item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
            },
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    gsap.from(".implementation__start > *", {
        scrollTrigger: {
            trigger: ".implementation",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2
    });

    gsap.from(".implementation__item", {
        scrollTrigger: {
            trigger: ".implementation__block",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7
    });

    gsap.from(".sliderBlock__start > *", {
        scrollTrigger: {
            trigger: ".sliderBlock",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2
    });

    gsap.from(".sliderBlock__slide-inner > *", {
        scrollTrigger: {
            trigger: ".sliderBlock__content",
            start: "top 75%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
    });

const heroTl = gsap.timeline();

heroTl
.from(".hero__video", {
    scale: 1.1,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
})
.from(".hero__name", {
    y: 30,
    opacity: 0,
    duration: 0.8
}, "-=0.6")
.from(".hero__title span", {
    y: 50,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.4")
.from(".hero__descr", {
    y: 30,
    opacity: 0,
    duration: 0.8
}, "-=0.4")
.from(".hero__btn", {
    y: 20,
    opacity: 0,
    duration: 0.6
}, "-=0.3");


gsap.from(".projects__start > *", {
    scrollTrigger: {
        trigger: ".projects",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8
});

gsap.utils.toArray(".projects__block").forEach((block, i) => {
    gsap.from(block, {
        scrollTrigger: {
            trigger: block,
            start: "top 85%",
        },
        x: i % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out"
    });
});

gsap.from(".infoBlock__title", {
    scrollTrigger: {
        trigger: ".infoBlock",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 0.8
});

gsap.from(".infoBlock__click", {
    scrollTrigger: {
        trigger: ".infoBlock",
        start: "top 75%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.6
});

gsap.from(".infoBlock__bottom > *", {
    scrollTrigger: {
        trigger: ".infoBlock__bottom",
        start: "top 85%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.7
});

gsap.from(".partners__start > *", {
    scrollTrigger: {
        trigger: ".partners",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.2
});

gsap.from(".partners__slider", {
    scrollTrigger: {
        trigger: ".partners__inner",
        start: "top 85%",
    },
    scale: 0.8,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6
});

gsap.from(".steps__content", {
    scrollTrigger: {
        trigger: ".steps__inner",
        start: "top 85%",
    },
    scale: 0.8,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6
});
gsap.from(".steps__start h2, .steps__start h3", {
    scrollTrigger: {
        trigger: ".steps__inner",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});




const moreBtn = document.querySelector('.article__more');
const articleInner = document.querySelector('.article__inner');
if (moreBtn && articleInner) {
    const collapseText = moreBtn.dataset.original;
    const expandText = moreBtn.textContent;
    moreBtn.addEventListener('click', () => {
        const isOpen = articleInner.classList.toggle('show-more');
        moreBtn.textContent = isOpen ? collapseText : expandText;
        if (!isOpen) {
            const rect = moreBtn.getBoundingClientRect();
            const scrollTop = window.scrollY || window.pageYOffset;
            const offset = rect.bottom + scrollTop - window.innerHeight + 30;
            if (offset > 0) {
                window.scrollTo({
                    top: offset,
                    behavior: "smooth"
                });
            }
        }
    });
}

const projectsMore = document.querySelector('.projects__more');
const projectsContent = document.querySelector('.projects__content');
if (projectsMore && projectsContent) {
    const collapseText = projectsMore.dataset.original;
    const expandText = projectsMore.textContent;
    projectsMore.addEventListener('click', () => {
        const isOpen = projectsContent.classList.toggle('show-more');
        projectsMore.textContent = isOpen ? collapseText : expandText;
        if (!isOpen) {
            const rect = projectsMore.getBoundingClientRect();
            const scrollTop = window.scrollY || window.pageYOffset;
            const offset = rect.bottom + scrollTop - window.innerHeight + 30;
            if (offset > 0) {
                window.scrollTo({
                    top: offset,
                    behavior: "smooth"
                });
            }
        }
    });
}

const implementationMore = document.querySelector('.implementation__more');
const implementationBlock = document.querySelector('.implementation__block');
if (implementationMore && implementationBlock) {
    const collapseText = implementationMore.dataset.original;
    const expandText = implementationMore.textContent;
    implementationMore.addEventListener('click', () => {
        const isOpen = implementationBlock.classList.toggle('show-more');
        implementationMore.textContent = isOpen ? collapseText : expandText;
        if (!isOpen) {
            const rect = implementationMore.getBoundingClientRect();
            const scrollTop = window.scrollY || window.pageYOffset;
            const offset = rect.bottom + scrollTop - window.innerHeight + 30;
            if (offset > 0) {
                window.scrollTo({
                    top: offset,
                    behavior: "smooth"
                });
            }
        }
    });
}


    let historySwiper = new Swiper(".history__slider", {
        loop: true,
        spaceBetween: 30,
        slidesPerView: 1,
        allowTouchMove: true,
        speed: 800,
        navigation: {
            nextEl: ".history__slider-next",
            prevEl: ".history__slider-prev",
        },
        // pagination: {
        //     el: ".blog__slider-pagination",
        //     clickable: true,
        // },
        // breakpoints: {
        //     775: {
        //         spaceBetween: 30,
        //         slidesPerView: 3,
        //     },
        //     931: {
        //         spaceBetween: 30,
        //         slidesPerView: 4,
        //     },
        // },
    });

    let certificatesMobile = new Swiper(".certificates__mobile", {
        loop: true,
        spaceBetween: 15,
        slidesPerView: 1.5,
        autoHeight: true,
        allowTouchMove: true,
        speed: 800,
        // navigation: {
        //     nextEl: ".history__slider-next",
        //     prevEl: ".history__slider-prev",
        // },
        pagination: {
            el: ".certificates__mobile-pagination",
            clickable: true,
        },
    });

const certificateBlocks = document.querySelectorAll('.certificates__block');
certificateBlocks.forEach((block) => {
    const sliderEl = block.querySelector('.certificates__slider');
    const nextBtn = block.querySelector('.slider-btn-next');
    const prevBtn = block.querySelector('.slider-btn-prev');
    new Swiper(sliderEl, {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 1,
        allowTouchMove: true,
        speed: 800,
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
    });
});


const firstBlockNames = document.querySelectorAll('.advantages__block:first-child .advantages__name');
const secondBlockNames = document.querySelectorAll('.advantages__block:last-child .advantages__name');
const icons = document.querySelectorAll('.advantages__center-icon');
const toggleActiveClass = (index, isAdd) => {
    const action = isAdd ? 'add' : 'remove';  
    if (firstBlockNames[index]) firstBlockNames[index].classList.toggle('active', isAdd);
    if (secondBlockNames[index]) secondBlockNames[index].classList.toggle('active', isAdd);
    if (icons[index]) icons[index].classList.toggle('active', isAdd);
};
const allNames = [...firstBlockNames, ...secondBlockNames];

const activateRow = (index) => {
    const firstBlockNames = document.querySelectorAll('.advantages__block:first-child .advantages__name');
    const secondBlockNames = document.querySelectorAll('.advantages__block:last-child .advantages__name');
    const icons = document.querySelectorAll('.advantages__center-icon');
    if (firstBlockNames[index]) firstBlockNames[index].classList.add('active');
    if (secondBlockNames[index]) secondBlockNames[index].classList.add('active');
    if (icons[index]) icons[index].classList.add('active');
};
const scrollOptions = {
    root: null,
    rootMargin: '0px 0px -50% 0px', 
    threshold: 0
};
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const parent = entry.target.parentNode;
            const namesInBlock = Array.from(parent.querySelectorAll('.advantages__name'));
            const index = namesInBlock.indexOf(entry.target);
            activateRow(index);
            observer.unobserve(entry.target);
        }
    });
}, scrollOptions);
document.querySelectorAll('.advantages__block:first-child .advantages__name').forEach(name => {
    scrollObserver.observe(name);
});
document.querySelectorAll('.advantages__block .advantages__name').forEach((name) => {
    name.addEventListener('mouseenter', (e) => {
        const parent = e.target.parentNode;
        const index = Array.from(parent.querySelectorAll('.advantages__name')).indexOf(e.target);
        activateRow(index);
    });
});





    let examplesSlider = new Swiper(".examples__slider", {
        loop: true,
        spaceBetween: 15,
        slidesPerView: 1.2, 
        allowTouchMove: true,
        speed: 800,
        navigation: {
            nextEl: ".examples__slider-next",
            prevEl: ".examples__slider-prev",
        },
        pagination: {
            el: ".examples__slider-pagination",
            clickable: true,
        },
        breakpoints: {
            769: {
                spaceBetween: 20,
                slidesPerView: 'auto',
            },
            1281: {
                spaceBetween: 30,
                slidesPerView: 'auto',
            },
        },
    });
const requirementsItems = document.querySelectorAll('.requirements__item');
requirementsItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        requirementsItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
    });
});



    let sliderBlockSlider = new Swiper(".sliderBlock__slider", {
        loop: true,
        spaceBetween: 0,
        slidesPerView: 1,
        allowTouchMove: true,
        speed: 800,
        pagination: {
            el: ".sliderBlock__slider-pagination",
            clickable: true,
        },
    });

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.requirements__item');
    const options = {
        rootMargin: '0px 0px -50% 0px',
        threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
        if (window.innerWidth >= 768) {
            return; 
        }
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                if (entry.boundingClientRect.top > (window.innerHeight / 2)) {
                    entry.target.classList.remove('active');
                }
            }
        });
    }, options);

    items.forEach(item => observer.observe(item));
});




document.addEventListener('DOMContentLoaded', () => {
    const clickBtn = document.querySelector('.infoBlock__click-btn');
    const clickParent = document.querySelector('.infoBlock__top');
    if (clickBtn && clickParent) {
        clickBtn.addEventListener('click', () => {
            clickParent.classList.toggle('clicked');
        });
    }
});



    let partnersSlider = new Swiper(".partners__slider", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        allowTouchMove: true,
        speed: 800,
        pagination: {
            el: ".partners__slider-pagination",
            clickable: true,
        },
        breakpoints: {
            769: {
                spaceBetween: 30,
                slidesPerView: 3,
            },
            1025: {
                spaceBetween: 30,
                slidesPerView: 4,
            },
        },
    });