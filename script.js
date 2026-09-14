document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. STICKY NAVBAR & SCROLL HIGHLIGHT ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const watermark = document.getElementById('watermark');
    const parts = watermark ? watermark.querySelectorAll('.wm-part') : [];
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Watermark Parallax & Puzzle Movement
                if (watermark) {
                    const scrolled = window.scrollY;
                    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
                    const progress = scrolled / maxScroll;
                    
                    // Overall container rotation and scale
                    watermark.style.transform = `rotate(${progress * 180}deg) scale(${1 + progress * 0.3})`;
                    
                    // Individual puzzle pieces breaking apart
                    if (parts.length === 4) {
                        const dist = progress * 150; 
                        const rot = progress * 180;
                        parts[0].style.transform = `translate(${dist}px, ${dist}px) rotate(${rot}deg)`;
                        parts[1].style.transform = `translate(-${dist}px, ${dist}px) rotate(-${rot}deg)`;
                        parts[2].style.transform = `translate(${dist}px, -${dist}px) rotate(-${rot}deg)`;
                        parts[3].style.transform = `translate(-${dist}px, -${dist}px) rotate(${rot}deg)`;
                    }
                }
                
                // Sticky Navbar
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Active Links Scroll Spy
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // --- 2. MOBILE MENU NAVBAR ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Simple animation for hamburger icon can be added here
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- 3. MODAL LOGIC ---
    const signupModal = document.getElementById('signupModal');
    const openBtns = [
        document.getElementById('openSignupBtnNav'), 
        document.getElementById('heroRegisterBtn'),
        document.getElementById('bottomRegisterBtn')
    ];
    const closeBtn = document.getElementById('closeSignupBtn');
    const signupForm = document.getElementById('signupForm');
    
    const openModal = () => {
        signupModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };
    
    const closeModal = () => {
        signupModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
    };
    
    openBtns.forEach(btn => {
        if(btn) btn.addEventListener('click', openModal);
    });
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === signupModal) {
            closeModal();
        }
    });
    
    // Form Submit handling
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Form validation
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const email = document.getElementById('email').value;
        
        if(password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Sending OTP...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('./send_otp.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: email })
            });
            const data = await response.json();

            if (data.success) {
                signupForm.style.display = 'none';
                document.getElementById('otpSection').style.display = 'block';
                document.getElementById('otpEmailDisplay').innerText = email;
            } else {
                alert('Error sending OTP: ' + data.message);
            }
        } catch (err) {
            alert('Failed to connect to backend server. Ensure server.js is running on port 3000.');
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });

    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener('click', async () => {
            const otpCode = document.getElementById('otpCode').value;
            const email = document.getElementById('email').value;

            if(!otpCode || otpCode.length < 6) return alert('Enter the 6-digit OTP code');

            verifyOtpBtn.innerText = 'Verifying...';
            verifyOtpBtn.disabled = true;

            try {
                const response = await fetch('./verify_otp.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ email: email, otp: otpCode })
                });
                const data = await response.json();

                if (data.success) {
                    verifyOtpBtn.innerText = 'Creating Profile...';
                    
                    // Now register user in database
                    const fullName = document.querySelectorAll('#signupForm input')[0].value || 'Player';
                    const targetUsername = document.querySelectorAll('#signupForm input')[4].value;
                    const pass = document.getElementById('password').value;
                    
                    try {
                        const regRes = await fetch('signup.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: targetUsername, email: email, password: pass })
                        });
                        const regData = await regRes.json();
                        
                        if (regData.success) {
                            verifyOtpBtn.innerText = 'Verified & Registered! ✅';
                            verifyOtpBtn.style.background = 'var(--primary-green)';
                            verifyOtpBtn.style.color = '#000';
                            
                            setTimeout(() => {
                                closeModal();
                                signupForm.reset();
                                document.getElementById('otpCode').value = '';
                                signupForm.style.display = 'block';
                                document.getElementById('otpSection').style.display = 'none';
                                
                                verifyOtpBtn.innerText = 'Verify & Join Arena';
                                verifyOtpBtn.style.background = '';
                                verifyOtpBtn.style.color = '';
                                verifyOtpBtn.disabled = false;
                                
                                alert('Congratulations! Your account is created. Please login.');
                            }, 1000);
                        } else {
                            alert('Registration failed: ' + regData.message);
                            verifyOtpBtn.innerText = 'Verify & Join Arena';
                            verifyOtpBtn.disabled = false;
                        }
                    } catch (e) {
                         alert('Backend error during registration.');
                         verifyOtpBtn.innerText = 'Verify & Join Arena';
                         verifyOtpBtn.disabled = false;
                    }
                } else {
                    alert('Invalid or expired OTP!');
                    verifyOtpBtn.innerText = 'Verify & Join Arena';
                    verifyOtpBtn.disabled = false;
                }
            } catch (err) {
                alert('Failed to connect for verification.');
                verifyOtpBtn.innerText = 'Verify & Join Arena';
                verifyOtpBtn.disabled = false;
            }
        });
    }

    // --- 4. FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open faqs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current faq
            item.classList.toggle('active');
        });
    });

    // --- 5. SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing once revealed for performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 6. 3D PUZZLE LOGIC ---
    const scene = document.getElementById('scene');
    const puzzleCube = document.getElementById('puzzleCube');
    let isExploded = false;
    let isAnimating = false;
    
    // Generate 27 small cubes (3x3x3) to match 20-40 requirement
    const gridSize = 3;
    const gap = 4; // Space between cubes
    const size = 60; // Slightly smaller cubes to fit the 200px container
    const totalCubes = [];
    const symbols = ['{ }', '[ ]', '</>', 'O(n)', 'O(log n)', 'dp()', 'DFS', 'BFS', 'Tree', 'Graph', 'Array', 'Hash'];
    
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
                
                const part = document.createElement('div');
                part.className = 'cube-part';
                
                // Position logic: Center the 3x3x3 assembly in the container
                // Offset calculation for center alignment
                const offset = size + gap;
                const tx = (x - 1) * offset;
                const ty = (y - 1) * offset;
                const tz = (z - 1) * offset;
                
                // Center origin inside the 200x200 container
                part.style.top = '70px'; // (200 - 60) / 2
                part.style.left = '70px';
                
                const baseTransform = `translate3d(${tx}px, ${ty}px, ${tz}px)`;
                part.style.transform = baseTransform;
                part.dataset.baseTransform = baseTransform;
                
                // Create the 6 faces for each small cube
                const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
                faces.forEach(faceName => {
                    const face = document.createElement('div');
                    face.className = `cube-face ${faceName}`;
                    
                    // Add some random DSA symbols to outward facing large sides
                    if (Math.random() > 0.6) {
                        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
                        face.innerText = symbol;
                    }
                    
                    part.appendChild(face);
                });
                
                puzzleCube.appendChild(part);
                totalCubes.push({
                    el: part,
                    tx, ty, tz,
                    baseTransform
                });
            }
        }
    }
    
    // Explosion interaction
    const explodePuzzle = () => {
        if (isAnimating || isExploded) return;
        isAnimating = true;
        isExploded = true;
        
        // Hide hint
        const hint = document.querySelector('.interactive-hint');
        if (hint) {
            hint.style.opacity = '0';
            setTimeout(() => hint.remove(), 500);
        }
        
        // Scatter small cubes
        totalCubes.forEach(cube => {
            // Random direction factors
            const scatterForce = 400 + Math.random() * 300;
            const dirX = (Math.random() - 0.5) * 2;
            const dirY = (Math.random() - 0.5) * 2;
            const dirZ = (Math.random() - 0.5) * 2;
            
            // Random rotations
            const rotX = Math.random() * 1080 - 540;
            const rotY = Math.random() * 1080 - 540;
            const rotZ = Math.random() * 1080 - 540;
            
            // Apply dramatic transform
            const scatterTransform = `
                translate3d(
                    ${cube.tx + (dirX * scatterForce)}px, 
                    ${cube.ty + (dirY * scatterForce)}px, 
                    ${cube.tz + (dirZ * scatterForce)}px
                ) 
                rotateX(${rotX}deg) 
                rotateY(${rotY}deg) 
                rotateZ(${rotZ}deg)
                scale(0.3)
            `;
            
            cube.el.style.transform = scatterTransform;
            cube.el.style.opacity = '0';
            cube.el.style.filter = 'blur(10px)';
        });
        
        // Rebuild the puzzle after a delay
        setTimeout(() => {
            totalCubes.forEach(cube => {
                cube.el.style.transform = cube.baseTransform;
                cube.el.style.opacity = '1';
                cube.el.style.filter = 'blur(0)';
            });
            
            setTimeout(() => {
                isExploded = false;
                isAnimating = false;
            }, 1600); // Wait for transition duration
            
        }, 2500); // Wait in exploded state
    };
    
    // Listen for click/tap to explode
    scene.addEventListener('click', explodePuzzle);
    scene.addEventListener('touchstart', (e) => {
        // Prevent generic click from firing again
        e.preventDefault();
        explodePuzzle();
    }, {passive: false});

});
