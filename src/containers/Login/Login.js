import React, { Component } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import JumboStyle from '../../components/JumboStyle/JumboStyle'
import FormField from '../../components/FormField/FormField'
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner'

class Login extends Component {
    state = {
        formControls: { useremail: { value: "" }, userpass: { value: "" } },
        loading: false,
        viewError: false
    }
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/auth', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                "username": this.state.formControls.useremail.value,
                "password": this.state.formControls.userpass.value
            })
        })
        if (response.ok) {
            const gotKey = await response.json();
            sessionStorage.setItem("userToken", gotKey['access_token']);
            this.setState({ loading: false })
            this.props.history.push({ pathname: '/game' });
        }
        else {
            let info = await response.text()
            console.log(info)
            this.setState({
                loading: false,
                viewError: true
            })
        }

    }
    render() {
        let form =
            <Container>
                <Form type="Form" onSubmit={this.handleSubmit}>
                    <FormField label="Username" name="useremail" type="username" placeholder="Enter Username" value={this.state.formControls.useremail.value} change={(event) => this.handleChange(event)} />
                    <FormField controlId="FormBasicPassword" label="Password" name="userpass" type="password" placeholder="Password" value={this.state.formControls.userpass.value} change={(event) => this.handleChange(event)} />
                    <Link to='/signup'>
                        <Form.Text className="text-muted">
                            Don't have an account? Sign up!
                        </Form.Text>
                    </Link>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        if (this.state.loading === true) {
            form = <LoadingSpinner />
        }
        let errorView =
            <Container>
                <Alert variant="danger">Wrong Info!</Alert>
            </Container>
        if (this.state.viewError === false) {
            errorView = null
        }
        return (
            <div>
                <NavigationBar />
                <JumboStyle display="Login" />
                {form}
                {errorView}

            </div>);
    }
}

export default Login;

