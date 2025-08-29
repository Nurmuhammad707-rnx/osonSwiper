import Contact from "../Pages/Contact";
import All from "../Pages/All";
import StorePrice from "../Pages/StorePrice";

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
    },
    {
        path:'/storePrice',
        element: <StorePrice/>,
        name:" Цена в аптеках"
    }
]