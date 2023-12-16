import { Container, Row, Col } from "react-bootstrap";
import Nav from "./Navbar";
export default function Home() {
    return (
        <>

            <Container style={{ maxWidth: '100%', maxHeight: "auto" }} >
                <div className="container" style={{
                    display: " flex", alignItems: 'center'
                }}>
                    <div style={{ marginRight: "1em", flex: '1', minWidth: '3em', position: 'sticky' }}>
                        <h2 style={{ marginTop: "0", fontWeight: 'bolder', color: 'purple' }}>Privacy's Finest Hour: One Password to Rule Them All</h2>
                        <p style={{ textAlign: 'justify', fontFamily: 'revert-layer', fontSize: '1em' }}>
                            Your data remains confidential and is inaccessible to anyone,<br />
                            including us<br />
                            Your master password is the exclusive key to unveil and manage your confidential vaults<br />

                        </p>
                    </div>
                    <img
                        className='abc'
                        src='/static/passw.jpeg'
                        alt="Profile"
                        style={{ float: 'right', marginLeft: '1em', maxWidth: '100%', height: 'auto' }}
                    ></img>

                </div>
            </Container>
        </>
    )
}