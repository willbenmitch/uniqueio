function Port() {
    if (process.env.NODE_ENV === 'production') {
        return "https://uniqueio.herokuapp.com";
    } else {
        return 'http://localhost:80';
    }
}

export default Port;