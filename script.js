/**
 * Dubai Zafrani Cream - Official Landing Page Script
 * Official Helpline: +92 306 6508319
 * Official Price: 1,999 PKR
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Pricing Configuration ---
  const PRICING_TIERS = {
    1: { price: 1999, label: '1 Jar (1,999 PKR)', delivery: 0 },
    2: { price: 3998, label: '2 Jars (3,998 PKR)', delivery: 0 },
    3: { price: 5499, label: '3 Jars (5,499 PKR - بچت آفر)', delivery: 0 }
  };

  const WHATSAPP_NUMBER = '923066508319';
  let selectedQty = 1;

  // DOM Elements
  const quantityOptions = document.querySelectorAll('.quantity-option');
  const billQtyText = document.getElementById('bill-qty-text');
  const billSubtotalText = document.getElementById('bill-subtotal-text');
  const billTotalText = document.getElementById('bill-total-text');
  const orderForm = document.getElementById('orderForm');

  // Format currency helper
  function formatPKR(num) {
    return Number(num).toLocaleString('en-US') + ' PKR';
  }

  // Update Bill Summary
  function updateBill() {
    const tier = PRICING_TIERS[selectedQty] || { price: selectedQty * 1999, label: `${selectedQty} Jars`, delivery: 0 };
    if (billQtyText) {
      billQtyText.textContent = `${selectedQty} جار (${selectedQty} Jar${selectedQty > 1 ? 's' : ''})`;
    }
    if (billSubtotalText) {
      billSubtotalText.textContent = formatPKR(tier.price);
    }
    if (billTotalText) {
      billTotalText.textContent = formatPKR(tier.price);
    }
  }

  // Quantity Selection Click Handlers
  quantityOptions.forEach((option) => {
    option.addEventListener('click', () => {
      quantityOptions.forEach((opt) => opt.classList.remove('selected'));
      option.classList.add('selected');
      selectedQty = parseInt(option.dataset.qty, 10) || 1;
      updateBill();
    });
  });

  // Form Validation & Submission
  if (orderForm) {
    const nameInput = document.getElementById('customerName');
    const phoneInput = document.getElementById('customerPhone');
    const cityInput = document.getElementById('customerCity');
    const addressInput = document.getElementById('customerAddress');

    // Helper to validate single field
    function validateField(input, errorElementId, message) {
      const val = input.value.trim();
      const errorMsg = document.getElementById(errorElementId);
      if (!val) {
        input.classList.add('has-error');
        if (errorMsg) {
          errorMsg.textContent = message;
          errorMsg.classList.add('visible');
        }
        return false;
      } else {
        input.classList.remove('has-error');
        if (errorMsg) {
          errorMsg.classList.remove('visible');
        }
        return true;
      }
    }

    // Real-time error clearance on typing
    [nameInput, phoneInput, cityInput, addressInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('has-error');
          const errorMsg = document.getElementById(input.id + '-error');
          if (errorMsg) {
            errorMsg.classList.remove('visible');
          }
        });
      }
    });

    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, 'customerName-error', 'براہ کرم اپنا پورا نام درج کریں۔');
      const isPhoneValid = validateField(phoneInput, 'customerPhone-error', 'براہ کرم اپنا موبائل یا واٹس ایپ نمبر درج کریں۔');
      const isCityValid = validateField(cityInput, 'customerCity-error', 'براہ کرم اپنا شہر منتخب یا درج کریں۔');
      const isAddressValid = validateField(addressInput, 'customerAddress-error', 'براہ کرم مکمل ڈیلیوری پتہ درج کریں۔');

      if (!isNameValid || !isPhoneValid || !isCityValid || !isAddressValid) {
        const firstError = orderForm.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
        return;
      }

      const tier = PRICING_TIERS[selectedQty] || { price: selectedQty * 1999 };
      const totalFormatted = formatPKR(tier.price);

      // Build structured, courteous Urdu + Roman Urdu WhatsApp message
      const messageLines = [
        '✨ *نیا آرڈر: Dubai Zafrani Cream* ✨',
        '---------------------------------------',
        `👤 *گاہک کا نام:* ${nameInput.value.trim()}`,
        `📱 *موبائل / واٹس ایپ نمبر:* ${phoneInput.value.trim()}`,
        `🏙️ *شہر کا نام:* ${cityInput.value.trim()}`,
        `📍 *مکمل پتہ برائے ڈیلیوری:* ${addressInput.value.trim()}`,
        `📦 *مطلوبہ تعداد:* ${selectedQty} Jar(s) (${tier.label})`,
        `💰 *کل رقم (Total Bill):* ${totalFormatted}`,
        '🚚 *ڈلیوری:* مفت ہوم ڈلیوری (Cash on Delivery)',
        '---------------------------------------',
        'السلام علیکم! براہ کرم میرا آرڈر جلد از جلد کنفرم کر کے روانہ فرمائیں۔ شکریہ!'
      ];

      const fullMessage = messageLines.join('\n');
      const encodedMsg = encodeURIComponent(fullMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

      // Open WhatsApp directly
      window.location.href = whatsappUrl;
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach((other) => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Interactive 3-Tier Layer Guide Hover effect on SVG
  const tierGuideItems = document.querySelectorAll('.tier-guide-item');
  tierGuideItems.forEach((guide) => {
    const layerClass = guide.dataset.layer;
    if (layerClass) {
      guide.addEventListener('mouseenter', () => {
        const targetElement = document.querySelector(`.${layerClass}`);
        if (targetElement) {
          targetElement.style.filter = 'brightness(1.15) drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))';
          targetElement.style.transition = 'all 0.3s ease';
        }
      });
      guide.addEventListener('mouseleave', () => {
        const targetElement = document.querySelector(`.${layerClass}`);
        if (targetElement) {
          targetElement.style.filter = '';
        }
      });
    }
  });

  // Initial bill state
  updateBill();
});
