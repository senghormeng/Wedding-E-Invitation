/**
 * Wedding E-Invitation Configuration
 * កំណត់ព័ត៌មានលម្អិតសម្រាប់សំបុត្រអាពាហ៍ពិពាហ៍
 */

const WEDDING_CONFIG = {
    // ព័ត៌មានទូទៅ / General Info
    weddingTitle: "សិរីមង្គលអាពាហ៍ពិពាហ៍",
    weddingSubtitle: "សេងហ័រ & វិច្ឆិកា",
    monogram: "ស វ", // អក្សរកាត់លើត្រាមាសទំព័រមុខ (Front Page Seal)
    envelopeCouple: "Senghor & Chanvicheka", // ឈ្មោះលើស្រោមសំបុត្រទំព័រមុខ (Front Page Envelope)
    
    // កាលបរិច្ឆេទ / Wedding Date
    weddingDateISO: "2026-11-22T07:00:00+07:00", // Format: YYYY-MM-DDTHH:mm:ss+07:00
    weddingDateKhmer: "ថ្ងៃអាទិត្យ ទី ២២ ខែវិច្ឆិកា ឆ្នាំ២០២៦",
    weddingDateEnglish: "Sunday, November 22, 2026",
    
    // កូនប្រុស / Groom
    groom: {
        khmerName: "ម៉េង សេងហ័រ",
        englishName: "MENG Senghor",
        photo: "assets/images/groom.jpg",
        father: "លោក ម៉េង សេងឡោ",
        mother: "លោកស្រី លាង គុយជ័ង"
    },
    
    // កូនស្រី / Bride
    bride: {
        khmerName: "កង ច័ន្ទវិច្ឆិកា",
        englishName: "KORNG Chanvicheka",
        photo: "assets/images/bride.jpg",
        father: "លោក សៅ វុទ្ធី",
        mother: "លោកស្រី ហេង រ័ត្ននី"
    },
    
    // សារគោរពអញ្ជើញ / Formal Invitation
    invitationMessage: "ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា ឧកញ៉ា លោក លោកស្រី អ្នកនាង កញ្ញា អញ្ជើញចូលរួម<br>ជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តីជ័យមង្គលក្នុង ពិធីសិរីមង្គល<br>អាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ",
    
    // កម្មវិធីមង្គលការ / Schedule (2-Day Celebration Program)
    schedule: {
        // កម្មវិធីថ្ងៃទី១៖ ថ្ងៃសៅរ៍ ទី២១ ខែវិច្ឆិកា ឆ្នាំ២០២៦ (Day 1: Saturday Nov 21, 2026 - 4 Events)
        day1: [
            { time: "០៣:០០ រសៀល", title: "ពិធីសែនក្រុងពាលី", desc: "ពិធីបួងសួងសែនក្រុងពាលី សុំម្ចាស់ទឹកម្ចាស់ដី" },
            { time: "០៤:០០ រសៀល", title: "ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត", desc: "និមន្តព្រះសង្ឃសូត្រមន្តចម្រើនព្រះបរិត្ត ប្រោះព្រំសិរីសួស្តី" },
            { time: "០៥:០០ នាទីល្ងាច", title: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារ", desc: "ទទួលស្វាគមន៍ និងអញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារ" },
            { time: "០៦:០០ នាទីល្ងាច", title: "ពិធីជាវខាន់ស្លា", desc: "ពិធីជាវខាន់ស្លា តាមប្រពៃណីទំនៀមទម្លាប់ខ្មែរ" }
        ],
        // កម្មវិធីថ្ងៃទី២៖ ថ្ងៃអាទិត្យ ទី២២ ខែវិច្ឆិកា ឆ្នាំ២០២៦ (Day 2: Sunday Nov 22, 2026 - 6 Events)
        day2: [
            { time: "០៧:០០ នាទីព្រឹក", title: "ពិធីហែជំនូន (កំណត់) ចូលរោងជ័យ", desc: "ដង្ហែជំនូនផ្លែឈើ និងគ្រឿងបណ្ណាការចូលរោងជ័យ" },
            { time: "០៨:០០ នាទីព្រឹក", title: "ពិធីនិយាយជើងការ រៀបរាប់ផ្លែឈើ", desc: "ពិធីនិយាយជើងការ រៀបរាប់ផ្លែឈើ និងសែនព្រេន" },
            { time: "០៩:០០ នាទីព្រឹក", title: "ពិធីកាត់សក់បង្កក់សិរី", desc: "ពិធីកាត់សក់ សិតសក់ និងប្រោះព្រំសិរីសួស្តីដល់កូនកំលោះកូនក្រមុំ" },
            { time: "១០:០០ នាទីព្រឹក", title: "ពិធីសំពះផ្ទឹម សែនចងដៃ បង្វិលពពិល", desc: "ពិធីក្រាបសំពះផ្ទឹម សែនចងដៃ និងបង្វិលពពិលប្រសិទ្ធពរជ័យ" },
            { time: "១១:០០ ថ្ងៃត្រង់", title: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារ", desc: "អញ្ជើញភ្ញៀវកិត្តិយស និងញាតិមិត្តរួមពិសាអាហារថ្ងៃត្រង់" },
            { time: "០៥:០០ នាទីល្ងាច", title: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាភោជនាហារ", desc: "ទទួលបដិសណ្ឋារកិច្ច និងពិសាភោជនាហារ នៅសាលពិធី ជីម៉ែប៉ែនព្រមៀរសេនដ័រ (យៀកថៃ) ក្រុងកំពង់ចាម" }
        ],
        // Aliases for compatibility
        get morning() { return this.day1; },
        get evening() { return this.day2; }
    },
    
    // ទីតាំង / Venue & Location
    venue: {
        name: "សាលពិធី ជីម៉ែប៉ែនព្រមៀរសេនដ័រ (យៀកថៃ)",
        address: "ក្រុងកំពង់ចាម ខេត្តកំពង់ចាម",
        googleMapsUrl: "https://maps.app.goo.gl/wcXT9QLLvdLVvjgZ7",
        // Embedded map query for Kampong Cham Phnom Pros Hotel
        embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15623.513758249622!2d105.4419515!3d11.9961201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b82f6e91cb3b5%3A0x6291a182092305!2sKampong%20Cham!5e0!3m2!1sen!2skh!4v1700000000000"
    },
    
    // ចំណងដៃ / Wedding Gift Info
    gift: {
        accountName: "CHANVICHEKA KANG",
        accountNumber: "019 547 742",
        accountNumberKhr: "019 866 424",
        bankName: "ABA Bank",
        qrImage: "assets/images/qr-code.png",
        note: "លោកអ្នកក៏អាចផ្ញើចំណងដៃតាមរយៈ QR Code របស់ពួកយើងខាងក្រោម"
    },


    
    // តន្ត្រីកំដរ / Background Music
    bgMusic: {
        title: "ជំហានទី ១ (First Step) - Olica",
        audioFile: "assets/audio/wedding-song.mp3" // បទចម្រៀងមង្គលការ
    },
    
    // វិចិត្រសាលរូបថត / Photo Gallery
    media: {
        galleryImages: [
            { src: "assets/images/gallery-1.jpg", caption: "សេចក្តីស្រលាញ់ដ៏កក់ក្តៅ" },
            { src: "assets/images/gallery-2.jpg", caption: "ស្នាមញញឹមនៃថ្ងៃអនាគត" },
            { src: "assets/images/gallery-3.jpg", caption: "ដៃកាន់ដៃឆ្ពោះទៅមុខ" },
            { src: "assets/images/gallery-4.jpg", caption: "គ្រាដ៏ផ្អែមល្ហែម" },
            { src: "assets/images/gallery-5.jpg", caption: "ដំណើរជីវិតថ្មីចាប់ផ្តើម" },
            { src: "assets/images/gallery-6.jpg", caption: "សេចក្តីសុខក្នុងចិត្ត" },
            { src: "assets/images/gallery-7.jpg", caption: "បេះដូងតែមួយ" },
            { src: "assets/images/gallery-8.jpg", caption: "អនុស្សាវរីយ៍ប្រាសាទបុរាណ" },
            { src: "assets/images/gallery-9.jpg", caption: "ជិះទូកកម្សាន្តនាទឹកដីអង្គរ" },
            { src: "assets/images/gallery-10.jpg", caption: "ស្នាមញញឹមសុភមង្គល" },
            { src: "assets/images/gallery-11.jpg", caption: "សេចក្តីស្រឡាញ់ដ៏ជ្រាលជ្រៅ" },
            { src: "assets/images/gallery-12.jpg", caption: "ភាពស្រស់ស្រាយនៃក្តីស្រឡាញ់" },
            { src: "assets/images/gallery-13.jpg", caption: "ពេលវេលាដ៏មានអត្ថន័យ" },
            { src: "assets/images/gallery-14.jpg", caption: "ពន្លឺថ្ងៃលិចដ៏រ៉ូមែនទិក" },
            { src: "assets/images/gallery-15.jpg", caption: "ចំណងនិស្ស័យអស់មួយជីវិត" },
            { src: "assets/images/gallery-16.jpg", caption: "គ្រាដ៏កក់ក្តៅ" },
            { src: "assets/images/gallery-17.jpg", caption: "សម្រស់កូនក្រមុំ" },
            { src: "assets/images/gallery-18.jpg", caption: "គូព្រេងនិស្ស័យ" },
            { src: "assets/images/gallery-19.jpg", caption: "ស្នេហ៍ផ្អែមល្ហែម" },
            { src: "assets/images/gallery-20.jpg", caption: "អាំងប៉ាវសុភមង្គល" }
        ]
    },
    
    // RSVP & ទំនាក់ទំនង / Contact
    contact: {
        groomPhone: "087 371 038",
        bridePhone: "069 275 710",
        telegramUsername: "MSENGHOR", // Username for sending RSVP message
        telegramQr: "assets/images/telegram-qr.png"
    },
    
    // Cloud Guestbook API (Google Sheet Web App URL)
    // រក្សាទុកពាក្យជូនពរពីភ្ញៀវទាំងអស់ចូល Google Sheet ក្នុង Drive
    wishesApiUrl: "https://script.google.com/macros/s/AKfycbzuvYV-_1HCfLaIR8s0HZavpaCLiLHYABHHP2VYxvuID12QdTB8F3THR17VNIV1BnhHlg/exec"
};

// Export to window
window.WEDDING_CONFIG = WEDDING_CONFIG;
