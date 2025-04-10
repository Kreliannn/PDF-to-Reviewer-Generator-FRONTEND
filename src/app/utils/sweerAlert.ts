import Swal from "sweetalert2"

export const confirmAlert = (callback: () => void) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "black",
        cancelButtonColor: "black",
        confirmButtonText: "remove item"
      }).then((result) => {
        if (result.isConfirmed) {
          callback()
        }
      });
}

export const errorAlert = (message: string) => {
  Swal.fire({
    title: "error",
    text: message,
    icon: "error",
    confirmButtonColor: "black",
  });
}

export const Alert = (type: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2300,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: (type == "success")? "success": "error",
      title: (type == "success")? "Correct Answer": "Wrrong Answer",
    });
}
