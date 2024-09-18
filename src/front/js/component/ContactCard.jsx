import React from "react";

export const ContactCard = ({ contact }) => {
    return (
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={contact.image || "..."} className="img-fluid rounded-start" alt={contact.name || "Contact Image"} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{contact.name || "Card title"}</h5>
                        <p className="card-text">{contact.description || "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."}</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated {contact.lastUpdated || "a while ago"}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
}