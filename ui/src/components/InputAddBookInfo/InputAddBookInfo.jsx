import { useCallback } from 'react';
import './index.css';
import { Input, Row, Col } from 'antd';

function InputAddBookInfo({ ...props }) {

    const { bookInfo, setBookInfo, name, label, value, addBookInputChange } = props;

    const handleAddBookInputChange = useCallback((e) => {
        addBookInputChange(e, name, bookInfo, setBookInfo);
    }, [])

    return (
        <Row className='input-wrap' gutter={16}>
            <Col className="gutter-row" span={5}>
                <div className='input-label'>{label}:</div>
            </Col>
            <Col className="gutter-row" span={4}>
                <Input className='form-input' placeholder={"please input " + name} value={value} onChange={handleAddBookInputChange} />
            </Col>
        </Row>
    )

}

export default InputAddBookInfo;