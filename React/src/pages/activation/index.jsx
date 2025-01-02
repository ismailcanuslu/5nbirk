import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { activateUser } from "./api";
import { Icons } from "../../assets/icons";

export function Activation() {
    const [apiProgress, setApiProgress] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const { token } = useParams();

    useEffect(() => {
        async function activate() {
            setApiProgress(true);
            try {
                const response = await activateUser(token);
                setSuccessMessage(response.data.message);
            } catch (axiosError) {
                setErrorMessage(axiosError.response.data.message);
            } finally {
                setApiProgress(false);
            }
        }
        activate();
    }, [])


    return (<>

        <Icons /> { }

        {apiProgress && (<div className="text-center" style={{ marginTop: '30px' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>)}

        {successMessage &&
            <div className="alert alert-success d-flex align-items-center" role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                    <use href="#check-circle-fill" />
                </svg>
                <div>
                    {successMessage}
                </div>
            </div>
        }
        {errorMessage &&
            <div className="alert alert-warning d-flex align-items-center" role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                    <use href="#exclamation-triangle-fill" />
                </svg>
                <div>
                    {errorMessage}
                </div>
            </div>
        }

    </>)
}