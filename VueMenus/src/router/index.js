// const login = r =>
//       require.ensure(
//           [],
//           () => r (require('../components/login/login/Index')),
//          'login'
//       )
// const lifeStages = r =>
//         require.ensure(
//             [],
//             () => r (require('../components/login/lifeStages/Index')),
//             'lifeStages'
//       )
// const expectedDate = r =>
//     require.ensure(
//         [],
//         () => r (require('../components/login/expectedDate/Index')),
//         'expectedDate'
//     )
// const postpartumInfor = r =>
//     require.ensure(
//         [],
//         () => r (require('../components/login/postpartumInfor/Index')),
//         'postpartumInfor'
//     )
// const disease = r =>
//     require.ensure(
//         [],
//         () => r (require('../components/login/disease/Index')),
//         'disease'
//     )
//
// const diet = r =>
//     require.ensure(
//         [],
//         () => r (require('../components/login/diet/Index')),
//         'diet'
//     )
//
// const allergy = r =>
//     require.ensure(
//         [],
//         () => r (require('../components/login/allergy/Index')),
//         'allergy'
//     )
//
// const productionInfor = r =>
// require.ensure(
//     [],
//     () => r (require('../components/login/productionInfor/Index')),
//     'productionInfor'
// )
//
//
// const badyInfor = r =>
//     require.ensure(
//         [],
//         () => r (require('../components/login/badyInfor/Index')),
//         'badyInfor'
//     )
//
// const basic = r =>
// require.ensure(
//     [],
//     () => r (require('../components/login/basic/Index')),
//     'basic'
// )
//
// const loginSuccess = r =>
// require.ensure(
//     [],
//     () => r (require('../components/login/loginSuccess/Index')),
//     'loginSuccess'
// )

const menu = r =>
require.ensure(
    [],
    () => r (require('../components/menu/index/Index')),
    'menu'
)

const body = r =>
require.ensure(
    [],
    () => r (require('../components/menu/body/Index')),
    'body'
)
const pregnancy = r =>
require.ensure(
    [],
    () => r (require('../components/menu/pregnancy/Index')),
    'pregnancy'
)
const pregnancyMother = r =>
require.ensure(
    [],
    () => r (require('../components/menu/pregnancyMother/Index')),
    'pregnancyMother'
)

const resetMenu = r =>
require.ensure(
    [],
    () => r (require('../components/menu/resetMenu/Index')),
    'resetMenu'
)


export default  [
    // {
    //     path: '/',
    //     component: login
    // },
    // {
    //     path: '/login',
    //     component: login
    // },
    // {
    //     path: '/lifestages',
    //     component: lifeStages
    // },
    // {
    //     path: '/expecteddate',
    //     component: expectedDate
    // },
    // {
    //     path: '/postpartuminfor',
    //     component: postpartumInfor
    // },
    // {
    //     path: '/disease',
    //     component: disease
    // },
    // {
    //     path: '/diet',
    //     component:diet
    // },
    // {
    //     path: '/allergy',
    //     component:allergy
    // },
    // {
    //     path: '/productioninfor',
    //     component:productionInfor
    // },
    // {
    //     path: '/postpartuminfor',
    //     component:postpartumInfor
    // },
    // {
    //     path: '/badyinfor',
    //     component:badyInfor
    // },
    // {
    //     path: '/basic',
    //     component:basic
    // },
    // {
    //     path: '/loginSuccess',
    //     component:loginSuccess
    // },

    //     path: '/menu', {
    {
        path: '/',
        component: menu
    },
    {
        path: '/body',
        component: body
    },
    {
        path: '/pregnancy',
        component: pregnancy
    },
    {
        path: '/pregnancyMother',
        component: pregnancyMother
    },
    {
        path: '/resetMenu',
        component: resetMenu
    }
    //     component:menu,
    //     children: [
    //         {
    //             path: '',
    //             name: 'pregnancy',
    //             component: pregnancy
    //         },
    //         {
    //             path: 'body',
    //             name: 'body',
    //             component: body
    //         },
    //         {
    //             path: 'pregnancy',
    //             name: 'pregnancy',
    //             component: pregnancy
    //         },
    //         {
    //             path: 'pregnancyMother',
    //             name: 'pregnancyMother',
    //             component: pregnancyMother
    //         },
    //         {
    //             path: 'resetMenu',
    //             name: 'resetMenu',
    //             component: resetMenu
    //         }
    //     ]
    // }
]