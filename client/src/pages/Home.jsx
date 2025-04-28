import React, { useContext } from 'react'
import { AppContext } from '../context/appContext'
import { Button } from '@/components/ui/button';

const Home = () => {
    const { name } = useContext(AppContext);
    return (
        <Button>
            {name}
        </Button>
    )
}

export default Home;
