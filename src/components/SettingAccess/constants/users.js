const userAccess = [
    {
        id: 0,
        name: "administartor",
        access: [
            {button1: false},
            {button2: true},
            {component1: true},
            {component2: false}
        ]
    },
    {
        id: 1,
        name: "user",
        access: [
            {button1: false},
            {button2: false},
            {component1: true},
            {component2: false},
            {button3: false},
            {button4: false},
            {component3: true},
            {component4: false}
        ]
    },
    {
        id: 2,
        name: "manager",
        access: [
            {button1: false},
            {button2: true},
            {component1: false},
            {component2: false}
        ]
    },
    {
        id: 3,
        name: "SA",
        access: [
            {button1: true},
            {button2: true},
            {component1: true},
            {component2: false}
        ]
    },
]

export default userAccess;