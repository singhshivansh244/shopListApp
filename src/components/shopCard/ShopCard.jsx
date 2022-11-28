import React from 'react'
import './shopCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { shopActions } from '../../store/shop'

export default function ShopCard({ shop }) {
    const dispatch = useDispatch()
    // console.log(shop);
    function removeShop(id) {
        dispatch(shopActions.deleteShop({ id: id }))
    }
    return (
        <div className='card__container'>
            <img
                src={`/images/shop-icon/${shop.category}.jpg`}
                alt={`${shop.category} shop`}
                className="card__img"
            />
            <div className="card__detailContainer">
                <div className="card__shopName">
                    Name: {shop.name}
                </div>
                <div className="card__shopName">
                    Category: {shop.category}
                </div>
                <div className="card__shopName">
                    Area: {shop.area}
                </div>
                <div className="card__shopName">
                    Opening Date: {shop.opening}
                </div>
                <div className="card__shopName">
                    Closing Date: {shop.closing}
                </div>
                <div className="card__remove">
                    <Button variant='danger' onClick={() => removeShop(shop.id)}>
                        REMOVE
                    </Button>
                </div>
            </div>
        </div>
    )
}
