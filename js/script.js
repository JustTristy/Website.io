document.addEventListener('DOMContentLoaded', function() {

    var contactForm = document.getElementById('contactForm');
    var hiringRadio = document.querySelector('input[name="purpose"][value="Hiring"]');
    var hourlyRateSection = document.getElementById('rate');

    function toggleHourlyRateInput(display) {
        hourlyRateSection.style.display = display ? 'block' : 'none';
    }

    contactForm.querySelectorAll('input[name="purpose"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
            toggleHourlyRateInput(hiringRadio.checked);
        });
    });

    ControlHourlyRateInput(hiringRadio.checked);

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateForm()) {
            this.submit();
        } else {
            alert('Please ensure all fields are filled out correctly.');
        }
    });

    function validateForm() {
        var name = contactForm['name'].value.trim();
        var email = contactForm['email'].value.trim();
        var address = contactForm['address'].value.trim();
        var city = contactForm['city'].value.trim();
        var postalCode = contactForm['postalCode'].value.trim();
        var message = contactForm['message'].value.trim();
        var purpose = contactForm['purpose'].value;
        var hourlyRate = purpose === 'Hiring' ? contactForm['hourlyRate'].value.trim() : null;
        
        if (!name) {
            alert('Name is required.');
            return false;
        }

        if (!validateEmail(email)) {
            alert('A valid email address is required.');
            return false;
        }

        if (!address) {
            alert('Address is required.');
            return false;
        }

        if (!city) {
            alert('City is required.');
            return false;
        }

        if (!validatePostalCode(postalCode)) {
            alert('A valid Canadian postal code is required.');
            return false;
        }

        if (!message) {
            alert('Please enter your message.');
            return false;
        }

        if (purpose === 'Hiring' && (!hourlyRate || isNaN(hourlyRate) || parseFloat(hourlyRate) <= 0)) {
            alert('Please enter a valid hourly rate.');
            return false;
        }

        return true;
    }

    function validateEmail(email) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    function validatePostalCode(postalCode) {
        var pattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        return pattern.test(postalCode);
    }
});
