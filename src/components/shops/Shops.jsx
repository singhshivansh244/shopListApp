import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shopActions } from '../../store/shop'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { v4 as uuid } from 'uuid'
import ShopCard from '../shopCard/ShopCard'
import ShowBy from '../showBy/ShowBy'
import './shops.css'

export default function Shops() {
    const dispatch = useDispatch()

    // bool value to show shop Modal
    const { showModal, txt, shopList, showBy, showFilterList, shopListToShow } = useSelector(state => state.shop)

    function FormBlock() {

        // alphabet only checking function
        function onInputChange(e) {
            const { value } = e.target.value;

            const re = /^[A-Z a-z]+$/;
            if (value === "" || re.test(value)) {
                dispatch(shopActions.setTxt({
                    txt: value,
                }))
            }
        }
        // hiding form 
        function hideForm() {
            dispatch(shopActions.showModal())
        }

        // adding new shop to global List
        function addShopList(e) {
            e.preventDefault()

            const name = document.getElementById('name').value
            const area = document.getElementById('area').value
            const opening = document.getElementById('opening').value
            const category = document.getElementById('category').value
            const closing = document.getElementById('closing').value

            if (opening > closing) {
                alert('wrong closing time ')
            } else {
                dispatch(shopActions.addShop({
                    name,
                    id: uuid(),
                    area,
                    category,
                    opening,
                    closing,
                }))
            }
        }

        return (
            <Form className='m-4'>
                <Form.Group className="mb-3">
                    <Form.Label>Shop Name</Form.Label>
                    <input
                        id='name'
                        value={txt}
                        onChange={onInputChange}
                        className='form-control'
                        type="text"
                        placeholder="Enter Name" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Shop Area</Form.Label>
                    <select id='area' aria-label="Default select example" className='form-select'>
                        <option>Select area</option>
                        <option value="Thane">Thane</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai Suburban">Mumbai Suburban</option>
                        <option value="Nashik">Nashik</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Ahmednagar">Ahmednagar</option>
                        <option value="Solapur">Solapur</option>
                    </select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Shop Category</Form.Label>
                    <select id='category' aria-label="Default select example" className='form-select'>
                        <option>Select Category</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Butcher">Butcher</option>
                        <option value="Baker">Baker</option>
                        <option value="Chemist">Chemist</option>
                        <option value="Stationery">Stationery shop</option>
                    </select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Shop Opening date</Form.Label>
                    <input
                        id='opening'
                        type="date"
                        placeholder="Enter Opening date"
                        className='form-control'
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Shop Closing date</Form.Label>
                    <input
                        id='closing'
                        type="date"
                        placeholder="Enter Closing date"
                        className='form-control'
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="m-3" onClick={addShopList}>
                    Submit
                </Button>
                <Button variant="danger" onClick={hideForm}>
                    Close
                </Button>
            </Form>
        )
    }

    function Card({ shops }) {
        return (
            <div className='shop__display'>
                {
                    shops.map((shop, idx) => <ShopCard key={idx} shop={shop} />)
                }
            </div>
        )
    }

    function AllShopList() {
        // opening form to add shop
        function openFilter() {
            dispatch(shopActions.showBy())
        }

        // bool value to show form of new shop details
        function openModal() {
            dispatch(shopActions.showModal())
        }

        return (
            <div>
                <div className="shop__btn">
                    <Button className="shop__addShop" onClick={openModal}>Add Shop</Button>
                    <Button className="shop__showBy" onClick={openFilter}>Filter</Button>
                </div>
                <h1 style={{ textAlign: 'center', marginTop: '1em' }}>All shops List</h1>
                <Card shops={shopList} />
            </div>
        )
    }

    function FilterCard() {
        function handleFilterClose() {
            dispatch(shopActions.showFilterList())
            dispatch(shopActions.showBy())
        }

        return (
            < div >
                <div className="shop__filterCloseBtn">
                    <Button
                        style={{ width: '50%', marginTop: '1em' }}
                        variant='danger'
                        onClick={handleFilterClose}
                    >Close</Button>
                </div>
                <h1 style={{ textAlign: 'center', marginTop: '1em' }}>Filtered shops List</h1>
                <Card shops={shopListToShow} />
            </div >
        )
    }


    // conditions to render components
    const showHomePage = (!showModal && !showBy && !showFilterList)
    const showFilterForm = (showBy && !showFilterList)
    const showAddShopForm = (showModal && !showFilterList)


    return (
        <div className='shop__container'>
            {showHomePage && <AllShopList />}
            {showFilterForm && <ShowBy />}
            {showAddShopForm && <FormBlock />}
            {showFilterList && <FilterCard />}
        </div >
    )
}
