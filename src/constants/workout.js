const workouts = [
    {
        title: 'Peito',
        exercises: [
            {
                title: 'Supino Inclinado Máquina',
                weights: ['15kg', '20kg', '25kg', '30kg', '35kg', '40kg', '45kg', '50kg', '55kg']
            },
            {
                title: 'Supino Reto Máquina',
                weights: ['30kg', '40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg']
            },
            {
                title: 'Crucifixo Máquina',
                weights: ['30kg', '40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg']
            },
            {
                title: 'Supino Inclinado Halter',
                weights: ['14kg', '16kg', '18kg', '20kg', '22kg', '24kg', '26kg', '28kg', '30kg']
            },
            {
                title: 'Supino Reto Halter',
                weights: ['14kg', '16kg', '18kg', '20kg', '22kg', '24kg', '26kg', '28kg', '30kg']
            },
            {
                title: 'Flexão de Braço',
                weights: ['Só mano']
            },
        ]
    },
    {
        title: 'Costas',
        exercises: [
            {
                title: 'Remada curvada pegada pronada',
                weights: ['20kg', '22kg', '24kg', '26kg', '28kg', '30kg', '32kg', '34kg', '36kg', '38kg']
            },
            {
                title: 'Remada curvada pegada supinada',
                weights: ['20kg', '22kg', '24kg', '26kg', '28kg', '30kg', '32kg', '34kg', '36kg', '38kg']
            },
            {
                title: 'Remada serrote',
                weights: ['20kg', '22kg', '24kg', '26kg', '28kg', '30kg', '32kg', '34kg', '36kg', '38kg']
            },
            {
                title: 'Remada cavalinho',
                weights: ['15kg', '20kg', '25kg', '30kg', '35kg', '40kg', '45kg', '50kg', '55kg', '60kg', '65kg']
            },
            {
                title: 'Puxada com o triângulo no pulley',
                weights: ['30kg', '40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg']
            },
            {
                title: 'Puxada com barra no pulley',
                weights: ['30kg', '40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg']
            },
            {
                title: 'Remada baixa',
                weights: ['30kg', '40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg']
            },
            {
                title: 'Barra fixa',
                weights: ['Só vai mano']
            },
        ]
    },
    {
        title: 'Biceps',
        exercises: [
            {
                title: 'Rosca Direta W',
                weights: ['18kg', '20kg', '22kg', '24kg', '26kg', '28kg', '30kg', '32kg', '34kg', '36kg', '38kg']
            },
            {
                title: 'Rosca Concentrada',
                weights: ['10kg', '12kg', '14kg', '16kg', '18kg', '20kg', '22kg', '24kg', '26kg', '28kg', '30kg']
            },
            {
                title: 'Rosca halteres no banco inclinado',
                weights: ['10kg', '12kg', '14kg', '16kg', '18kg', '20kg', '22kg', '24kg', '26kg', '28kg', '30kg']
            },
            {
                title: 'Rosca Martelo',
                weights: ['10kg', '12kg', '14kg', '16kg', '18kg', '20kg', '22kg', '24kg', '26kg', '28kg', '30kg']
            },
            {
                title: 'Rosca Banco Scott',
                weights: ['10kg', '15kg', '20kg', '25kg', '30kg', '40kg', '50kg']
            },
            {
                title: 'Rosca invertida Polia',
                weights: ['30kg', '40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg']
            },
        ]
    },

    {
        title: 'Triceps',
        exercises: [
            {
                title: 'Tríceps testa W',
                weights: ['15kg', '18kg', '20kg', '22kg', '24kg', '26kg', '28kg', '30kg', '32kg', '34kg', '36kg', '38kg']
            },
            {
                title: 'Tríceps na máquina',
                weights: ['40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg']
            },
            {
                title: 'Tríceps polia barra reta',
                weights: ['40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg']
            },
            {
                title: 'Tríceps polia corda',
                weights: ['40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg']
            },

        ]
    },

    {
        title: 'Ombro',
        exercises: [
            {
                title: 'Desenvolvimento Máquina',
                weights: ['15kg', '20kg', '25kg', '30kg', '35kg', '40kg', '45kg', '50kg', '55kg', '60kg', '65kg']
            },
            {
                title: 'Desenvolvimento com barra',
                weights: ['15kg', '18kg', '20kg', '22kg', '24kg', '26kg', '28kg', '30kg']
            },
            {
                title: 'Desenvolvimento Arnold',
                weights: ['10kg', '12kg', '15kg', '18kg', '20kg', '22kg', '24kg', '26kg', '28kg', '30kg']
            },
            {
                title: 'Elevação lateral halteres',
                weights: ['8kg', '10kg', '12kg', '15kg', '18kg', '20kg', '22kg', '24kg', '26kg', '28kg', '30kg']
            },
            {
                title: 'Voador invertido na máquina',
                weights: ['15kg', '20kg', '25kg', '30kg', '35kg', '40kg', '45kg', '50kg', '55kg', '60kg', '65kg']
            },
            {
                title: 'Remada alta no cabo',
                weights: ['40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg']
            },
        ]
    },

    {
        title: 'Perna',
        exercises: [
            {
                title: 'Leg Press Horizontal',
                weights: ['60kg', '70kg', '80kg', '90kg', '100kg', '110kg', '120kg', '130kg', '140kg']
            },
            {
                title: 'Leg Press Horizontal unilateral',
                weights: ['30kg', '40kg', '50kg', '60kg', '70kg', '80kg']
            },
            {
                title: 'Super Squat',
                weights: ['80kg', '100kg', '120kg', '140kg', '160kg', '180kg']
            },
            {
                title: 'Leg Press 45',
                weights: ['80kg', '100kg', '120kg', '140kg', '160kg', '180kg']
            },
            {
                title: 'Agachamento no Smith',
                weights: ['40kg', '60kg', '80kg', '100kg', '120kg', '140kg']
            },
            {
                title: 'Cadeira Extensora',
                weights: ['40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg', '110kg', '120kg', '130kg', '140kg']
            },
            {
                title: 'Cadeira Flexora',
                weights: ['40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg', '110kg', '120kg', '130kg', '140kg']
            },
            {
                title: 'Cadeira Adutora',
                weights: ['40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg', '110kg', '120kg', '130kg', '140kg']
            },
            {
                title: 'Cadeira Abdutora',
                weights: ['40kg', '50kg', '60kg', '70kg', '80kg', '90kg', '100kg', '110kg', '120kg', '130kg', '140kg']
            },
        ]
    },
]

module.exports = { workouts };