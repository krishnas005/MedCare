

export const signUp = async(formData) => {

    try {
        const res = await fetch('https://med-care-dun.vercel.app/api/signup', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch(err) {
        alert('Enter correct Information!')
        console.error(err);
    }

}