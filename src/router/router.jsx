import Contact from "../Pages/Contact";
import All from "../Pages/All";


export const router =[
    {
        path:'/',
        element: <Contact/>,
        name:"Контакты"
    },
    {
        path:'/allProduct',
        element: <All/>,
        name:"Все"
    }
]