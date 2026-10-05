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
        father: "លោក ម៉េង សេងឡៅ",
        mother: "លោកស្រី លាង ជ័ង"
    },
    
    // កូនស្រី / Bride
    bride: {
        khmerName: "កង ច័ន្ទវិច្ឆិកា",
        englishName: "KORNG Chanvicheka",
        photo: "assets/images/bride.jpg",
        father: "លោក សៅ វ៉ិធ្វី",
        mother: "លោកស្រី ហេង រតនី"
    },
    
    // សារគោរពអញ្ជើញ / Formal Invitation
    invitationMessage: "យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា ឧកញ៉ា លោក លោកស្រី អ្នកនាង កញ្ញា អញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្ដីជ័យមង្គលក្នុង ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ",
    
    // កម្មវិធីមង្គលការ / Schedule
    schedule: {
        morning: [
            { time: "០៧:០០ ព្រឹក", title: "ពិធីហែជំនូន (កំណត់)", desc: "ដង្ហែជំនូនផ្លែឈើ និងគ្រឿងបណ្ណាការចូលគេហដ្ឋាន" },
            { time: "០៧:៣០ ព្រឹក", title: "ពិធីរៀបរាប់ផ្លែឈើ និងសែនព្រេន", desc: "ពិធីសែនព្រេនជូនដំណឹងដល់ជីដូនជីតា" },
            { time: "០៨:០០ ព្រឹក", title: "ពិធីបំពាក់ចិញ្ចៀន", desc: "កូនប្រុស និងកូនស្រីបំពាក់ចិញ្ចៀនអាពាហ៍ពិពាហ៍" },
            { time: "០៩:០០ ព្រឹក", title: "ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត", desc: "ព្រះសង្ឃចម្រើនព្រះបរិត្តប្រសិទ្ធពរជ័យមង្គល" },
            { time: "១០:០០ ព្រឹក", title: "ពិធីកាត់សក់បង្កក់សិរី", desc: "ពិធីកាត់សក់ និងចងដៃកូនប្រុសកូនស្រី" },
            { time: "១១:០០ ព្រឹក", title: "ពិធីក្រាបសំពះផ្ទឹម", desc: "ពិធីក្រាបសំពះផ្ទឹម ចងអំបោះក្រហម និងបង្វិលពពិល" },
            { time: "១២:០០ ថ្ងៃត្រង់", title: "អញ្ជើញភ្ញៀវពិសាអាហារថ្ងៃត្រង់", desc: "ពិសារអាហារថ្ងៃត្រង់ជុំគ្នា" }
        ],
        evening: [
            { time: "០៥:០០ ល្ងាច", title: "ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស", desc: "ស្វាគមន៍ភ្ញៀវកិត្តិយស និងថតរូបអនុស្សាវរីយ៍" },
            { time: "០៦:០០ ល្ងាច", title: "ពិសារភោជនាហារពេលល្ងាច", desc: "ពិសាភោជនាហារ ស្តាប់តន្ត្រីកំដរ និងកាត់នំមង្គលការ" }
        ]
    },
    
    // ទីតាំង / Venue & Location
    venue: {
        name: "សាលពិធី ដឹម៉ៃប៊េនព្រេមៀសេនធ័រ ក្រុងកំពង់ចាម",
        address: "ក្រុងកំពង់ចាម ខេត្តកំពង់ចាម",
        googleMapsUrl: "https://maps.app.goo.gl/wcXT9QLLvdLVvjgZ7",
        // Embedded map query for Kampong Cham Phnom Pros Hotel
        embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15623.513758249622!2d105.4419515!3d11.9961201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b82f6e91cb3b5%3A0x6291a182092305!2sKampong%20Cham!5e0!3m2!1sen!2skh!4v1700000000000"
    },
    
    // ចំណងដៃ / Wedding Gift Info
    gift: {
        accountName: "KORNG Chanvicheka",
        accountNumber: "010345664",
        bankName: "ABA BANK / KHQR",
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
            { src: "assets/images/gallery-6.jpg", caption: "សេចក្តីសុខក្នុងចិត្ត" }
        ]
    },
    
    // RSVP & ទំនាក់ទំនង / Contact
    contact: {
        groomPhone: "087 371 038",
        bridePhone: "069 275 710",
        telegramUsername: "Senghor_Vicheka_wedding" // Username for sending RSVP message
    }
};

// Export to window
window.WEDDING_CONFIG = WEDDING_CONFIG;
