CREATE TABLE solicitudes_tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    soli_id INT NOT NULL,
    doc_id INT NOT NULL,
    id_user_responsible INT NOT NULL,
    task VARCHAR(255) NOT NULL,
    init_date DATETIME NOT NULL,
    commitment_date DATETIME NOT NULL,
    completed_date DATETIME,
    auto_task BOOLEAN DEFAULT 0,
    from_ia BOOLEAN DEFAULT 0,
    status VARCHAR(50) NOT NULL,
    percent_progress DECIMAL(5, 2) DEFAULT 0.00,
    communication_sms BOOLEAN DEFAULT 0,
    communication_email BOOLEAN DEFAULT 0,
    communication_call BOOLEAN DEFAULT 0,
    communication_wa BOOLEAN DEFAULT 0,
    request_evidence BOOLEAN DEFAULT 0,
    mark_completed_by_owner BOOLEAN DEFAULT 0,
    comments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by INT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT NOT NULL
);


CREATE TABLE contactos (
    idReg INT AUTO_INCREMENT PRIMARY KEY,
    c_name VARCHAR(100) NOT NULL,
    c_lastname VARCHAR(100) NOT NULL,
    c_documentType VARCHAR(50) NOT NULL,
    c_document VARCHAR(20) NOT NULL,
    c_email VARCHAR(100) NOT NULL,
    c_phone VARCHAR(20),
    c_profile VARCHAR(50),
    c_token VARCHAR(255),
    c_registration DATETIME DEFAULT CURRENT_TIMESTAMP,
    c_user VARCHAR(100),
    footercharge BOOLEAN DEFAULT 0,
    c_address VARCHAR(255)
);
