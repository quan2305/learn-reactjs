import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles ,} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        listStyleType: 'none',
        padding: '0',
        

    },
    items: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        
    }

}))

FilterViewer.propTypes = {
    filter: PropTypes.object,
    onChange: PropTypes.func,
};

const Filter_LIST = [
    {
        id:1,
        getlabel:() => 'Giao hang mien phi',
        isActive:(filter) =>filter.isFreeShip,
        isVisible:(filter) => true,
        isRemovable:(filter) => false,
        onRemove: () => false,
        onToggle:(filter) =>{
            const newFilter = {...filter};
            if(filter.isFreeShip){
                delete newFilter.isFreeShip;
            } else {
                newFilter.isFreeShip = true;
            }
            return newFilter;
        },
    },
    {
        id:2,
        getlabel:() => 'Khuyen mai',
        isActive:(filter) => filter.isPromotion,
        isVisible:(filter) => filter.isPromotion,
        isRemovable: (filter) => (Boolean(filter.isPromotion)),
        onRemove: (filter) =>{
            const newFilter = {...filter};
            if(filter.isPromotion){
                delete newFilter.isPromotion;
            } else {
                newFilter.isPromotion = true;
            }
            return newFilter;
        },
        onToggle:(filter) =>{},
    },
    {
        id:3,
        getlabel:(filter) => `Gia: ${filter.salePrice_gte} - ${filter.salePrice_lte}` ,
        isActive:(filter) => true,
        isVisible:(filter) => (Object.keys(filter).includes('salePrice_gte') && Object.keys(filter).includes('salePrice_lte')),
        isRemovable:(filter) => true,
        onRemove: (filter) =>{
            const newFilter = {...filter};
            if(filter.salePrice_lte && filter.salePrice_gte){
                delete newFilter.salePrice_lte;
                delete newFilter.salePrice_gte;
            } else {
                newFilter.salePrice_lte = filter.salePrice_lte;
                newFilter.salePrice_gte = filter.salePrice_gte;
            }
            return newFilter;
        },
        onToggle:(filter) =>{},
    },
    {
        id:4,
        getlabel:(filter) => `${localStorage.getItem('category_id')}`,
        isActive:(filter) => true,
        isVisible:(filter) => (Boolean(Object.keys(filter).includes('category.id'))),
        isRemovable:(filter) => true,
        onRemove: (filter) =>{
            const newFilter = {...filter};
            const name = 'category.id';
            if(filter[name]){
                delete newFilter[name];
            } else {
                newFilter[name] = newFilter[name];
            } 
            return newFilter;
        },
        onToggle:(filter) =>{},
    }
];

function FilterViewer({filter, onChange}) {
    const classes = useStyles();

    const filterVisible = useMemo(()=>{
        return Filter_LIST.filter((x) => x.isVisible(filter));
    }, [filter])

    return (
        <div>
            <Box component="ul" className={classes.root}>
                {filterVisible.map(x => (
                    <li key={x.id} className={classes.items}> 
                        <Chip
                            label= {x.getlabel(filter)}
                            clickable = {x.isRemovable(filter)}
                            color={x.isActive(filter) ? 'primary' : 'default'}
                            onDelete={!x.isRemovable(filter) ? null : ()=> {
                                if(!onChange)return;

                                const newFilter = x.onRemove(filter);
                                onChange(newFilter);
                            }} 
                            onClick={!x.isRemovable(filter) ? ()=> {
                                if(!onChange)return;

                                const newFilter = x.onToggle(filter);
                                onChange(newFilter);
                            } : null}
                          
                        />
                    </li>
                ))}
            </Box>
        </div>
    );
}

export default FilterViewer;