const CycleData = {
    status: 0, //  0 is doing, 1 done, 2 upcoming
    orm: [60, 140, 80, 130], // ohp dl bench squat 
    tmRatio: 0.85,
    template: {
        name: "bbb",
        variant: "original",
        tmRatioSupplemental: 0.4,
    },
    createdAt: "2023-06-26T00:00:00.000",
    week: [
        {
            status: 0,
            week: 0,
            workLog: [
                {
                    type: 'ohp',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                },
                {
                    type: 'dl',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                },
                {
                    type: 'bench',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                },
                {
                    type: 'squat',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                }
            ]
        },
        {
            status: 0,
            week: 1,
            workLog: [
                {
                    type: 'ohp',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                },
                {
                    type: 'dl',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                },
                {
                    type: 'bench',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                },
                {
                    type: 'squat',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                }
            ]
        },
        {
            status: 0,
            week: 2,
            workLog: [
                {
                    type: 'ohp',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                },
                {
                    type: 'dl',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                },
                {
                    type: 'bench',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                },
                {
                    type: 'squat',
                    log: [], // work log here 16 sets = 16 objs
                    done: false,
                    notes: null,
                    timeWorkout: null,
                    timeCreated: null
                }
            ]
        },
    ]
}

const SupplementTemplate = [
    {
        name: "Boring but big",
        value: "bbb",
        variant: [
            {
                name: "Original (5 x 10)",
                value: "original",
                work: {
                    0: {
                        percentage: [0.45, 0.45, 0.45, 0.45, 0.45],
                        reps: [10, 10, 10, 10, 10]
                    },
                    1: {
                        percentage: [0.45, 0.45, 0.45, 0.45, 0.45],
                        reps: [10, 10, 10, 10, 10]
                    },
                    2: {
                        percentage: [0.45, 0.45, 0.45, 0.45, 0.45],
                        reps: [10, 10, 10, 10, 10]
                    },
                }
            },
            {
                name: "Less Boring (3 x 10)",
                value: "less",
                work: {
                    0: {
                        percentage: [0.45, 0.45, 0.45],
                        reps: [10, 10, 10]
                    },
                    1: {
                        percentage: [0.45, 0.45, 0.45],
                        reps: [10, 10, 10]
                    },
                    2: {
                        percentage: [0.45, 0.45, 0.45],
                        reps: [10, 10, 10]
                    },
                }
            },
        ]
    },
    {
        name: "First set last",
        value: "fsl",
        variant: [],
        work: {
            0: {
                percentage: [0.65, 0.65, 0.65, 0.65, 0.65],
                reps: [5,5,5,5,5]
            },
            1: {
                percentage: [0.7, 0.7, 0.7, 0.7, 0.7],
                reps: [5, 5, 5, 5, 5]
            },
            2: {
                percentage: [0.75, 0.75, 0.75, 0.75, 0.75],
                reps: [5, 5, 5, 5, 5]
            },
        }
    },
]

const InputOneRepMax = [
    {
        "typeDay": "ohp",
        "reps": "1",
        "weight": "60.63",
        "trainingMax": "52.5"
    },
    {
        "typeDay": "dl",
        "reps": "1",
        "weight": "150.36",
        "trainingMax": "127.5"
    },
    {
        "typeDay": "bench",
        "reps": "1",
        "weight": "80.63",
        "trainingMax": "67.5"
    },
    {
        "typeDay": "squat",
        "reps": "1",
        "weight": "130.3",
        "trainingMax": "110"
    }
]

const NameExercise = {
    ohp: "Overhead Press",
    dl: "Deadlift",
    bench: "Bench Press",
    squat: "Squat"
}

const ExerciseCategories = {
    0: 'push',
    1: 'pull',
    2: 'core & leg'
}

const ExercisesData = [
    {
        "name": "Overhead Press",
        "musccle": "",
        "category": 0,
        "id": 0
    },
    {
        "name": "Deadlift",
        "musccle": "",
        "category": 1,
        "id": 1
    },
    {
        "name": "Bench Press",
        "musccle": "",
        "category": 0,
        "id": 2
    },
    {
        "name": "Squat",
        "musccle": "",
        "category": 2,
        "id": 3
    },
    {
        "name": "dips",
        "musccle": "",
        "category": 0,
        "id": 4
    },
    {
        "name": "push-ups",
        "musccle": "",
        "category": 0,
        "id": 5
    },
    {
        "name": "dumbbell press",
        "musccle": "",
        "category": 0,
        "id": 6
    },
    {
        "name": "triceps extensions",
        "musccle": "",
        "category": 0,
        "id": 7
    },
    {
        "name": "triceps pushdonws",
        "musccle": "",
        "category": 0,
        "id": 8
    },
    {
        "name": "full range plate raise",
        "musccle": "",
        "category": 0,
        "id": 9
    },
    {
        "name": "chin-ups",
        "musccle": "",
        "category": 1,
        "id": 10
    },
    {
        "name": "pull-ups",
        "musccle": "",
        "category": 1,
        "id": 11
    },
    {
        "name": "inverted rows",
        "musccle": "",
        "category": 1,
        "id": 12
    },
    {
        "name": "rows",
        "musccle": "",
        "category": 1,
        "id": 13
    },
    {
        "name": "curls",
        "musccle": "",
        "category": 1,
        "id": 14
    }
]

const TimerTitle = ['Warmup Sets', 'Main Sets', 'Supplemental Sets', 'Assistance Sets']

export { ExercisesData, CycleData, ExerciseCategories, SupplementTemplate, InputOneRepMax, NameExercise, TimerTitle };