function Dialog({ message, onDialog }) {

    const handleDialogClick = (e) => {
        e.stopPropagation();
      }
    return (
        <div 
            className='dialog-container'
            onClick={handleDialogClick}
        >
            <div className='dialog-content'>
                <h3>{message}</h3>
                <div style={{display: "flex", alignItems:"center", color: "white"}}>
                    <button 
                    onClick={()=>onDialog(true)}
                        style={{
                            background:"red", 
                            color:"white", 
                            padding:"10px", 
                            marginRight: "4px",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Yes
                    </button>
                    <button 
                    onClick={()=>onDialog(false)}
                        style={{
                            background:"green", 
                            color:"white", 
                            padding:"10px", 
                            marginLeft: "4px",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialog