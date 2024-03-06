import { useState } from 'react';
import './index.css';
import { Input, Row, Col } from 'antd';

function InputAddBookInfo({ bookInfo, setBookInfo, name, label, value }) {

    const handleChange = (e) => {
        const curVal = e.target.value;

        const newBookInfo = Array.from(bookInfo);
        newBookInfo.forEach(e => {
            if (e.name === name) {
                e.value = curVal;
            }
        });
        setBookInfo(newBookInfo);
    }

    return (
        <Row className='input-wrap' gutter={16}>
            <Col className="gutter-row" span={5}>
                <div className='input-label'>{label}:</div>
            </Col>
            <Col className="gutter-row" span={4}>
                <Input className='form-input' placeholder="input title" onChange={handleChange} />
            </Col>
        </Row>
    )

}

export default InputAddBookInfo;