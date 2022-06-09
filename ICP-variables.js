ICP.vars = {


    instance: '0',
    cdiv: 'cardNumbers',
    
    //headers
    p1Head: 'How many cards will you be ordering in your first year?',
    p1Sub: '',
    p2Head: 'Will you need a slot punch?',
    p2Sub: '',
    p3Head: 'What features do you need?',
    p3Sub: 'Click all that apply',
    p4Head: 'Do you need color printing on the BACK of the card?',
    p4Sub: '',
    p5Head: 'Ready to get started?',
    p5Sub: 'Have more questions?',


    //pricing pane
    pricingHead: 'Price per Card',
    prePrice: 'Total',
    postPrice: 'Per Card',
    priceSub: '+ postage*',
    totalCost: 0,
    base1: 'Base Cost',
    baseSub :'<span style=\'padding:10px;\'>Deducted from your prepaid account<br>($195 minimum)</span>',


    //messages
    enterpriseMsg: '<span class=\'bigMsg\'>Call us at <span style=\'font-weight: 800;\'>888.555.1212</span> for enterprise pricing.</span>',

    postageMsg: 'Lorem ipsum dolor sit amet. Eirmod ea kasd clita sed vero. Vulputate et rebum at option dolore. Invidunt diam ipsum feugait accusam. Clita tempor feugiat hendrerit takimata. Vel lorem et stet. Gubergren exerci gubergren suscipit ea justo minim nihil. Accumsan et diam hendrerit dolore amet. Sadipscing vero sanctus duis eos. In rebum laoreet vero et eros. Vel voluptua ea at enim ad eum ea. Sadipscing augue dolor sit nisl. At et consequat nonumy erat. Doming invidunt labore lorem. Eu feugait tempor aliquyam sed justo. Nam nulla sanctus. Delenit et amet kasd nonumy dolore. No gubergren dolore. In dolor lorem praesent duo voluptua nonumy. Dolor veniam lorem et augue. Duo vero sed. Nulla blandit invidunt labore voluptua vel. Amet gubergren consequat sanctus. Duo consequat amet takimata duo vero at sit. Rebum takimata justo consetetur justo diam kasd consetetur. Doming elitr augue. Lorem sea nibh lorem. Rebum takimata clita eos eu nonummy molestie diam. Lorem in dolor et dolor. Elitr ex justo amet lorem liber dolor kasd. ',

    clamshellMsg: 'Lorem ipsum dolor sit amet. Eirmod ea kasd clita sed vero. Vulputate et rebum at option dolore. Invidunt diam ipsum feugait accusam. Clita tempor feugiat hendrerit takimata. Vel lorem et stet. Gubergren exerci gubergren suscipit ea justo minim nihil. Accumsan et diam hendrerit dolore amet. Sadipscing vero sanctus duis eos. In rebum laoreet vero et eros.',

    prepaidMsg: '',

    rfidMsg: '',

    //breadcrumbs

    //buttons
    backBut: 'BACK',
    fullPage: 'FULL PRICING PAGE',
    next: 'continue',
    setUp: 'SET UP YOUR ACCOUNT',
    cta: 'SPEAK TO A REPRESENTATIVE',
    //option titles

    //footer


    menu: {
        techOptions: [
            { title: 'Barcode', cost: 0, disp_cost: 'FREE', selected: false, notice: false, image: './img/barcode_option.png', id: 'barcode' },
            { title: 'Magstripe', cost: 0, disp_cost: 'FREE', selected: false, notice: false, image: './img/mag_stripe_option.png', id: 'mag_stripe' },
            { title: 'QR Code', cost: 0, disp_cost: 'FREE', selected: false, notice: false, image: './img/QR_code_option.png', id: 'qrcode', },
            { title: 'Holographic Overlay', cost: 160, disp_cost: '$1.60', selected: false, notice: false, image: './img/overlay_option.png', id: 'holograph', },
            { title: 'Exposed Chip', cost: 250, disp_cost: '$2.50', selected: false, notice: false, image: './img/exposed_chip_option.png', id: 'smart_chip', },
            { title: 'Contactless/RFID', cost: 250, disp_cost: '$2.50', selected: false, notice: false, image: './img/contactless_rfid_option.png', id: 'contactless', },
            { title: 'Clamshell', cost: 0, disp_cost: 'CONTACT', selected: false, notice: true, image: './img/prox_option.png', id: 'clamshell' },

        ],
        basic_card: { title: '', cost: 780, disp_cost: '$7.80', selected: true, notice: false , id : 'basic-card'},
        employees: [
            { title: '500 or Fewer', cost: 0, disp_cost: '', selected: false, notice: false , image: './img/fewer_500.png',id: '500_few'},
            { title: 'More than 500', cost: 0, disp_cost: '', selected: false, notice: true , image: './img/more_500.png',id: 'more_500'}
        ],
        slot_punch: [
            { title: 'Slot Punch', cost: 60, disp_cost: '$0.60', selected: false, notice: false , image: './img/slot_punch.png', id: 'slot'},
            { title: 'No Slot Punch', cost: 0, disp_cost: 'FREE', selected: false, notice: false , image: './img/no_punch.png', id: 'noslot'}
        ],
        full_color_back: [
            { title: 'Full Color Back', cost: 95, disp_cost: '$0.95', selected: false, notice: false , image: './img/color_back.png',id: 'color_back'},
            { title: 'Black & White Back', cost: 0, disp_cost: 'FREE', selected: false, notice: false , image: './img/bnw_back.png',id: 'bnw_back'},
        ]
    },

    continueCard: { title: 'Contuinue', image: './img/continue.png', id: 'continue' },

    //img file paths


}