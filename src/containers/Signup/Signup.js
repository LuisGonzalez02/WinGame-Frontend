import React, { Component } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import JumboStyle from '../../components/JumboStyle/JumboStyle'
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner'



class Signup extends Component {
    state = {
        formControls: { useremail: { value: "" }, username: { value: "" }, userpass: { value: "" } },
        loading: false,
        viewError: false,
        errorMessage: ""
    }

    handleChange = event => {

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
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.formControls.username.value,
                "email": this.state.formControls.useremail.value,
                "password": this.state.formControls.userpass.value
            })
        })
        if (response.status === 200) {

            this.setState({ loading: false })
            this.props.history.push({
                pathname: '/login',
            });

        }
        else {
            let stuff = await response.json()
            this.setState({
                loading: false,
                viewError: true,
                errorMessage: stuff['message']
            })

            console.log(stuff)
        }

    }
    render() {
        let form = <Container>
            <Form type="Form" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="useremail" type="email" placeholder="Enter email" value={this.state.formControls.useremail.value} onChange={this.handleChange} />

                </Form.Group>
                <Form.Group controlId="formBasicUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="user" placeholder="Enter username" value={this.state.formControls.username.value} onChange={this.handleChange} />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="userpass" type="password" placeholder="Password" value={this.state.formControls.userpass.value} onChange={this.handleChange} />
                </Form.Group>
                <Link to='/login'>
                    <Form.Text className="text-muted">
                        Already Registered? Log In!
        </Form.Text>
                </Link>

                <Button variant="primary" type="submit">
                    Submit
            </Button>

            </Form>
        </Container>
        if (this.state.loading) {
            form = <LoadingSpinner />;
        }
        let errorView =
            <Container>
                <Alert variant="danger">{this.state.errorMessage}</Alert>
            </Container>
        if (this.state.viewError === false) {
            errorView = null
        }
        return (
            <div>
                <NavigationBar />
                <JumboStyle display="Sign Up" />
                {form}
                {errorView}

            </div>);
    }
}

export default Signup;