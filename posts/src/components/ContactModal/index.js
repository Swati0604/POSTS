import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

// Styles
import './styles.scss';

class ContactModal extends Component {
  render() {
    const { handleClose, isModalVisible } = this.props;
    return (
      <Modal
        show={isModalVisible}
        onHide={handleClose}
        animation={true}
        className='payment-modal-style'
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h6 className='madal-heading text-center'>
            Questions or feedback for our team? <br />
            We want to hear from you:
          </h6>

          <p className='description text-center'>
            Write to us at
            <br />
            <span className='highlighted-text'>
              rohanmishra.design@gmail.com
            </span>
          </p>
        </Modal.Body>
      </Modal>
    );
  }
}
export default ContactModal;
