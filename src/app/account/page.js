'use client';

import ComponentLevelLoader from "@/components/ComponentLoader";
import InputComponent from "@/components/InputComponent";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { addNewAddress, deleteAddress, fetchAllAddresses, updateAddress } from "@/services/data";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Account() {

    const {
        user,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        componentLevelLoader,
        setComponentLevelLoader,
        pageLevelLoader,
        setPageLevelLoader,
    } = useContext(GlobalContext);


    const [showAddressForm, setShowAddressForm] = useState(false);
    const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
    const router = useRouter()

    async function extractAllAddresses() {
        setPageLevelLoader(true);
        const res = await fetchAllAddresses(user?._id);
        console.log("DATA1: " + res.allergies);
        if (res.success) {
            setPageLevelLoader(false);
            console.log("DATA: " + res.allergies);
            setAddresses(res.data);
        }
    }

    async function handleAddOrUpdateAddress() {
        setComponentLevelLoader({ loading: true, id: "" });
        const res =
            currentEditedAddressId !== null
                ? await updateAddress({
                    ...addressFormData,
                    _id: currentEditedAddressId,
                })
                : await addNewAddress({ ...addressFormData, userID: user?._id });

        console.log(res);

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message, {
                position: "top-right",
            });
            setAddressFormData({
                DOB: "",
                medications: "",
                chronicDiseases: "",
                allergies: "",
                height: "",
                weight: ""
            });
            extractAllAddresses();
            setCurrentEditedAddressId(null);
            router.push('/')
        } else {
            toast.error(res.message, {
                position: "top-right",
            });
            setAddressFormData({
                DOB: "",
                medications: "",
                chronicDiseases: "",
                allergies: "",
                height: "",
                weight: ""
            });
        }
    }

    function handleUpdateAddress(getCurrentAddress) {
        setShowAddressForm(true);
        setAddressFormData({
            DOB: getCurrentAddress.DOB,
            chronicDiseases: getCurrentAddress.chronicDiseases,
            medications: getCurrentAddress.medications,
            allergies: getCurrentAddress.allergies,
            height: getCurrentAddress.height,
            weight: getCurrentAddress.weight,
        });
        setCurrentEditedAddressId(getCurrentAddress._id);
    }

    async function handleDelete(getCurrentAddressID) {
        setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

        const res = await deleteAddress(getCurrentAddressID);

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });

            toast.success(res.message, {
                position: "top-right",
            });
            await extractAllAddresses();
        } else {
            setComponentLevelLoader({ loading: false, id: "" });

            toast.error(res.message, {
                position: "top-right",
            });
        }
    }

    useEffect(() => {
        if (user !== null) extractAllAddresses();
    }, [user]);

    return (
        <section>
            <Navbar />
            <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8 mt-[80px]">
                <div className="bg-white shadow">
                    <div className="p-6 sm:p-12">
                        <div className="flex flex-col flex-1">
                            <h4 className="text-lg font-semibold ">
                                Name: {user?.name}
                            </h4>
                            <p className="text-lg ">Email: {user?.email}</p>
                        </div>
                        <div className="mt-6">
                            <h1 className="font-bold text-lg">Your Data :</h1>
                            {pageLevelLoader ? (
                                <PulseLoader
                                    color={"#000000"}
                                    loading={pageLevelLoader}
                                    size={15}
                                    data-testid="loader"
                                />
                            ) : (
                                <div className="mt-4 flex flex-col gap-4">
                                    {addresses && addresses.length > 0 ? (
                                        addresses.map((item) => (
                                            <div className="border p-6" key={item._id}>
                                                <p>DATE OF BIRTH : {item.DOB}</p>
                                                <p>chronicDiseases : {item.chronicDiseases}</p>
                                                <p>Medications : {item.medications}</p>
                                                <p>Allergies : {item.allergies}</p>
                                                <p>Weight : {item.weight}</p>
                                                <p>Height : {item.height}</p>
                                                <button
                                                    onClick={() => handleUpdateAddress(item)}
                                                    className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                                >Delete
                                                    {componentLevelLoader &&
                                                        componentLevelLoader.loading &&
                                                        componentLevelLoader.id === item._id ? (
                                                        <ComponentLevelLoader
                                                            text={"Deleting"}
                                                            color={"#ffffff"}
                                                            loading={
                                                                componentLevelLoader &&
                                                                componentLevelLoader.loading
                                                            }
                                                        />
                                                    ) : (
                                                        "Delete"
                                                    )}
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No data found ! Please add a new data below</p>
                                    )
                                    }
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                            >
                                {showAddressForm ? "Hide Data Form" : "Add New Data"}
                            </button>
                        </div>
                        {showAddressForm ? (
                            <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                                    {addNewAddressFormControls.map((controlItem) => (
                                        <InputComponent
                                            type={controlItem.type}
                                            placeholder={controlItem.placeholder}
                                            label={controlItem.label}
                                            value={addressFormData[controlItem.id]}
                                            key={controlItem.id}
                                            onChange={(event) =>
                                                setAddressFormData({
                                                    ...addressFormData,
                                                    [controlItem.id]: event.target.value,
                                                })
                                            }
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={handleAddOrUpdateAddress}
                                    className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                >
                                    {componentLevelLoader && componentLevelLoader.loading ? (
                                        <ComponentLevelLoader
                                            text={"Saving"}
                                            color={"#ffffff"}
                                            loading={
                                                componentLevelLoader && componentLevelLoader.loading
                                            }
                                        />
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <Notification />
        </section>
    );
}