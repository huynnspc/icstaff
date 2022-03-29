import React from 'react'
import PropTypes from 'prop-types';

class ModalPopup extends React.Component {
  componentDidMount() {
    window.modalInitial()
  }

  render() {
    return (
    <div className="row">
    <div className="col-sm-12">
        <div className="panel panel-bd">
            <div className="panel-body">
                <div className="modal-text-header">
                    <h1>Nifty Modal Window Effects<span>Some inspiration for different modal window appearances</span> </h1>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="column">
                            <p className="modal-text">There are many possibilities for modal overlays to appear. Here are some modern ways of showing them using CSS transitions and animations.</p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="column">
                            {/* <!-- All modals added here for the demo. You would of course just have one, dynamically created --> */}
                            {/* <!-- Modal fade in & scale effect --> */}
                            <div className="md-modal md-effect-1" id="modal-1">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal slide in (right) effects --> */}
                            <div className="md-modal md-effect-2" id="modal-2">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal slide in (bottom) effects --> */}
                            <div className="md-modal md-effect-3" id="modal-3">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal newspaper effects --> */}
                            <div className="md-modal md-effect-4" id="modal-4">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal fall effects --> */}
                            <div className="md-modal md-effect-5" id="modal-5">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal side fall effects --> */}
                            <div className="md-modal md-effect-6" id="modal-6">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal sticky up effects --> */}
                            <div className="md-modal md-effect-7" id="modal-7">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal 3D flip (horizontal) effects --> */}
                            <div className="md-modal md-effect-8" id="modal-8">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal 3D flip (vertical) effects --> */}
                            <div className="md-modal md-effect-9" id="modal-9">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal 3D sign effects --> */}
                            <div className="md-modal md-effect-10" id="modal-10">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal super scaled effects --> */}
                            <div className="md-modal md-effect-11" id="modal-11">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal just Me effects --> */}
                            <div className="md-modal md-effect-12" id="modal-12">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal 3D slit effects --> */}
                            <div className="md-modal md-effect-13" id="modal-13">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal 3D rotate bottom effects --> */}
                            <div className="md-modal md-effect-14" id="modal-14">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal 3D rotate in left effects --> */}
                            <div className="md-modal md-effect-15" id="modal-15">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal blur effects --> */}
                            <div className="md-modal md-effect-16" id="modal-16">
                                <div className="md-content">
                                    <h3>Modal Dialog 16</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal let me in effects --> */}
                            <div className="md-modal md-effect-17" id="modal-17">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal make way! effects --> */}
                            <div className="md-modal md-effect-18" id="modal-18">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Modal slip from top effects --> */}
                            <div className="md-modal md-effect-19" id="modal-19">
                                <div className="md-content">
                                    <h3>Modal Dialog</h3>
                                    <div className="n-modal-body">
                                        <p>This is a modal window. You can do the following things with it:</p>
                                        <ul>
                                            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                                            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                                            <li><strong>Close:</strong> click on the button below to close the modal.</li>
                                        </ul>
                                        <button className="btn btn-success md-close">Close me!</button>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-1" >Fade in &amp; Scale</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-2">Slide in (right)</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-3">Slide in (bottom)</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-4">Newspaper</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-5">Fall</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-6">Side Fall</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-7">Sticky Up</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-8">3D Flip (horizontal)</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-9">3D Flip (vertical)</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-10">3D Sign</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-11">Super Scaled</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-12">Just Me</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-13">3D Slit</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-14">3D Rotate Bottom</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-15">3D Rotate In Left</button>
                            <button className="btn btn-success md-trigger m-b-5 m-r-2" data-modal="modal-16">Blur</button>
                            {/* <!-- special modal that will add a perspective class to the html element --> */}
                            <button className="btn btn-success md-trigger md-setperspective m-b-5 m-r-2" data-modal="modal-17">Let me in</button>
                            <button className="btn btn-success md-trigger md-setperspective m-b-5 m-r-2" data-modal="modal-18">Make way!</button>
                            <button className="btn btn-success md-trigger md-setperspective m-b-5 m-r-2" data-modal="modal-19">Slip from top</button>
                            {/* <!-- the overlay element --> */}
                            <div className="md-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
  }
}

export default ModalPopup;