export const sessionsDummy = [
    {
        id: 1,
        date: new Date(),
        couch: 'Tomaž Vulič',
        classes: [{ label: 'Nadeljevalni', color: "red" }],
        description: '10min teka <br /> 10min raztegovanja',
        attendees: [
            {
                id: 3,
                name: 'Janja Garnbret',
                image: 'https://cdn.quasar.dev/img/avatar2.jpg',
                tags: [{ label: '4.KYU', color: "blue" }],
            },
            {
                id: 4,
                name: 'Tina Trstenjak',
                image: 'https://cdn.quasar.dev/img/avatar3.jpg',
                tags: [{ label: '3.KYU', color: "brown" }],
            }],
        tags: [{ label: 'kondicijski', color: "purple" }, { label: 'priprave', color: "indigo" }, { label: 'kondicijski', color: "purple" }, { label: 'priprave', color: "indigo" }, { label: 'kondicijski', color: "purple" }, { label: 'priprave', color: "indigo" }, { label: 'kondicijski', color: "purple" }, { label: 'priprave', color: "indigo" },]
    },
    {
        id: 2,
        date: new Date(),
        couch: 'Tomaž Vulič',
        classes: [{ label: 'Začetniki', color: "pink" }, { label: 'Nadeljevalni', color: "red" }],
        description: '10min teka <br /> 10min raztegovanja',
        attendees: [
            {
                id: 1,
                name: 'Rok Petrovič',
                image: 'https://cdn.quasar.dev/img/avatar1.jpg',
                dateOfBirth: new Date(),
                tags: [{ label: '7.KYU', color: "orange" }],
            },
            {
                id: 2,
                name: 'Rajmond Debevec',
                tags: [{ label: '6.KYU', color: "green" }],
            },
            {
                id: 3,
                name: 'Janja Garnbret',
                image: 'https://cdn.quasar.dev/img/avatar2.jpg',
                tags: [{ label: '4.KYU', color: "blue" }],
            },
            {
                id: 4,
                name: 'Tina Trstenjak',
                image: 'https://cdn.quasar.dev/img/avatar3.jpg',
                tags: [{ label: '3.KYU', color: "brown" }],
            }]
    },
    {
        id: 3,
        date: new Date(),
        couch: 'Tomaž Vulič',
        classes: [{ label: 'Začetniki', color: "pink" }],
        description: '10min teka <br /> 10min raztegovanja',
        attendees: [
            {
                id: 1,
                name: 'Rok Petrovič',
                image: 'https://cdn.quasar.dev/img/avatar1.jpg',
                dateOfBirth: new Date(),
                tags: [{ label: '7.KYU', color: "orange" }],
            }],
        tags: [{ label: 'kondicijski', color: "purple" }]
    },
]

export const attendanceDummy = [
    {
        id: 1,
        name: 'Rok Petrovič',
        image: 'https://cdn.quasar.dev/img/avatar1.jpg',

        classes: [{ label: 'Začetniki', color: "pink" }],
        percentage: '10',
        tags: [{ label: '7.KYU', color: "orange" }],
        dateOfBirth: new Date()
    },
    {
        id: 2,
        name: 'Rajmond Debevec',
        // 
        classes: [{ label: 'Začetniki', color: "pink" }],
        percentage: '98',
        tags: [{ label: '6.KYU', color: "green" }],
        dateOfBirth: new Date().setDate(new Date().getDate() + 1) //tomorrow
    },
    {
        id: 3,
        name: 'Janja Garnbret',
        image: 'https://cdn.quasar.dev/img/avatar2.jpg',

        classes: [{ label: 'Nadeljevalni', color: "red" }],
        percentage: '49',
        tags: [{ label: '4.KYU', color: "blue" }],
        dateOfBirth: new Date().setDate(new Date().getDate() + 1) //tomorrow
    },
    {
        id: 4,
        name: 'Tina Trstenjak',
        image: 'https://cdn.quasar.dev/img/avatar3.jpg',

        classes: [{ label: 'Nadeljevalni', color: "red" }],
        percentage: '0',
        tags: [{ label: '3.KYU', color: "brown" }],
        dateOfBirth: new Date().setDate(new Date().getDate() + 1) //tomorrow
    }
]

export const membersDummy = [
    {
        id: 1,
        name: 'Rok Petrovič',
        image: 'https://cdn.quasar.dev/img/avatar1.jpg',
        classes: [{ label: 'Začetniki', color: "pink" }],
        percentage: '10',
        tags: [{ label: '7.KYU', color: "orange" }],
        dateOfBirth: new Date()
    },
    {
        id: 2,
        name: 'Rajmond Debevec',
        // 
        classes: [{ label: 'Začetniki', color: "pink" }],
        percentage: '98',
        tags: [{ label: '6.KYU', color: "green" }],
        dateOfBirth: new Date().setDate(new Date().getDate() + 1) //tomorrow
    },
    {
        id: 3,
        name: 'Janja Garnbret',
        image: 'https://cdn.quasar.dev/img/avatar2.jpg',

        classes: [{ label: 'Nadeljevalni', color: "red" }],
        percentage: '49',
        tags: [{ label: '4.KYU', color: "blue" }],
        dateOfBirth: new Date().setDate(new Date().getDate() + 1) //tomorrow
    },
    {
        id: 4,
        name: 'Tina Trstenjak',
        image: 'https://cdn.quasar.dev/img/avatar3.jpg',

        classes: [{ label: 'Nadeljevalni', color: "red" }],
        percentage: '0',
        tags: [{ label: '3.KYU', color: "brown" }],
        dateOfBirth: new Date().setDate(new Date().getDate() + 1) //tomorrow
    }
]

export const eventsDummy = ['2022/08/01', '2022/08/01', '2022/08/05', '2022/08/06', '2022/08/09', '2022/08/23']

export const optionsClassesDummy = [
    { label: 'Začetniki', color: "pink" },
    { label: 'Nadeljevalni', color: "red" }
]

export const optionsTagsDummy = [
    { label: 'kondicijski', color: "purple" },
    { label: 'priprave', color: "indigo" },
    { label: 'Izpit', color: "cyan" }
]

export const optionsCouchDummy = ['Miha Čebron', 'Tomaž Vulič', 'Žan Lozar']