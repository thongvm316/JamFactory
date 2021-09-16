import React from 'react'
import { Row, Col, Radio } from 'antd';
import './GroupButton.scss'

const GroupButton = ({ redirect, clickable }) => {
    return (
        <>
            <Row gutter={24} className="group-button">
                <Col span={24} className="style-click-btn">
                    <Radio.Group size="middle" defaultValue={clickable}>
                        <Radio.Button
                            value="a"
                            shape="round"
                            size="middle"
                            onClick={() => redirect('/home')}
                        >
                            전체 요약분석
                        </Radio.Button>

                        <Radio.Button
                            style={{ marginLeft: '10px', marginRight: '10px' }}
                            value="b"
                            shape="round"
                            size="middle"
                            onClick={() => redirect('/category-analysis')}
                        >
                            카테고리 별 분석
                        </Radio.Button>

                        <Radio.Button
                            style={{ marginLeft: '10px', marginRight: '10px' }}
                            className="style-small-device"
                            value="c"
                            shape="round"
                            size="middle"
                            onClick={() => redirect('/analysis-market')}
                        >
                            마켓별 분석
                        </Radio.Button>

                        <Radio.Button
                            className="style-small-device"
                            value="d"
                            shape="round"
                            size="middle"
                            onClick={() => redirect('/analysis-sales')}
                        >
                            월별 카테고리 매출 분석
                        </Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
        </>
    )
}

export default GroupButton
