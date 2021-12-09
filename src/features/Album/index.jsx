import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList'

AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name:'Chill cung Rap Viet',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/8/2/f/5/82f55da7d8e87167d6edcf66013455aa.jpg'
        },
        {
            id: 1,
            name:'Nhac moi moi ngay',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/5/a/7/5/5a75949c935b96579ecb59fa20c1063d.jpg'
        },
        {
            id: 1,
            name:'K-Pop day hua hen',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/c/4/1/a/c41adeb202cfe197246f8523dac4e44b.jpg'
        },
    ];

    return (
        <div>
            <AlbumList albumList = {albumList}/>
        </div>
    );
}

export default AlbumFeature;