import authreducer from './auth.reducers';
import usereducer from './user.reducer'
import productreducer from './product.reducers'
import orderreducer from './order.reducers'
import {combineReducers} from 'redux'
import categoryReducers from './category.reducers';
import pagereducer from './page.reducer'

const rootreducer=combineReducers({
    auth:authreducer,
    user:usereducer,
    product:productreducer,
    order:orderreducer,
    category:categoryReducers,
    page:pagereducer

})

export default rootreducer