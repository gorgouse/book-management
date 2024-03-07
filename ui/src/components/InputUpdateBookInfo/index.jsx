import { useState } from 'react';
import './index.css';
import { Input, Row, Col } from 'antd';

function InputUpdateBookInfo(
    {
        isDetail,
        updateId,
        updateBookList,
        setUpdateBook, 
        name,
        label,
        value
    }
) {
    const handleChange = (e) => {
        const curVal = e.target.value;

        const newUpdateBookList = Array.from(updateBookList);
        newUpdateBookList.forEach(e => {
            if (e.name === name) {
                e.value = curVal;
            }
        });
        setUpdateBook({
            updateId,
            updateBookList: newUpdateBookList
        });
    }

    return (
        <Row className='input-wrap' gutter={16}>
            <Col className="gutter-row" span={5}>
                <div className='input-label'>{label}:</div>
            </Col>
            <Col className="gutter-row" span={4}>
                {
                    isDetail ? <Input disabled className='form-input' placeholder="input title" value={value} />
                        : <Input className='form-input' placeholder="input title" value={value} onChange={handleChange} />
                }
            </Col>
        </Row>
    )

}

export default InputUpdateBookInfo;