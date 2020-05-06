// import required dependencies
import React from 'react';
import { usePagination } from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

// style for pagination
const useStyles = makeStyles({
    ul: {
        listStyle: 'none',
        padding: 0,
        'margin-left': '9rem',
        display: 'flex',
    },
    li: {
        'margin-right': '1rem'
    }
});

export default function UsePagination(props: any) {
    const classes = useStyles();
    const { items } = usePagination({
        count: Math.ceil(props.cases/10),
        showLastButton: true,
        showFirstButton: true,
        onChange: getData
    });

    function getData(event: Object, page: number) {
        props.showData(page);
    }

    return (
        <nav>
            <ul className={classes.ul}>
                {items.map(({ page, type, selected, ...item }, index) => {
                    let children = null;

                    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                        children = '…';
                    } else if (type === 'page') {
                        children = (
                            <button type="button" style={{ fontWeight: selected ? 'bold' : undefined }} {...item}>
                                {page}
                            </button>
                        );
                    } else {
                        children = (
                            <button type="button" {...item}>
                                {type}
                            </button>
                        );
                    }

                    return <li key={index} className={classes.li} >{children}</li>;
                })}
            </ul>
        </nav>
    );
}
