import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { shopActions } from '../../store/shop'

export default function ShowBy() {


    const [value, setValue] = useState('Type')
    const [select, setSelect] = useState(null)

    const dispatch = useDispatch()

    function showShopBy() {
        dispatch(shopActions.showShops({
            filter: value,
            condition: select,
        }))
    }

    // hiding form 
    function hideForm() {
        dispatch(shopActions.showBy())
    }

    function handleChange(e) {
        setValue(e.target.value)
    }

    function handleForm(e) {
        setSelect(prev => e.target.value)
    }

    const area = ['Thane', 'Pune', 'Mumbai Suburban', 'Nashik', 'Nagpur', 'Ahmednagar', 'Solapur']
    const category = ['Grocery', 'Butcher', 'Baker', 'Chemist', 'Stationery shop']

    let selectForm = <div>
        <Form.Label>Select {`${value}`}</Form.Label>
        <select id='showBySpecific' className='form-select' onChange={handleForm}>
            <option>Select area</option>
            {value === 'category' && category.map((a, idx) => <option key={idx} value={`${a}`}>{`${a}`}</option>)}
            {value === 'area' && area.map((a, idx) => <option key={idx} value={`${a}`}>{`${a}`}</option>)}
        </select>
    </div>

    const flag = value !== 'opening' && value !== 'closing'
    const dateForm = <div>
        <Form.Label>Select {`${value}`}</Form.Label>
        <input type='date' className='form-control' onChange={handleForm} />
    </div>
    return (
        <div>
            <Form.Label>Select Type</Form.Label>
            <select id='showByType' className='form-select' onChange={handleChange}>
                <option>Select area</option>
                <option value="area">Area</option>
                <option value="category">Category</option>
                <option value="opening">Opening</option>
                <option value="closing">Closing</option>
            </select>
            {
                flag ? selectForm : dateForm
            }
            <Button variant="primary" type="submit" className="m-3" onClick={showShopBy}>
                Submit
            </Button>
            <Button variant="danger" onClick={hideForm}>
                Close
            </Button>
        </div>
    )
}
