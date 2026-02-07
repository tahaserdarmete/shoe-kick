import type {FC} from "react";
import Form from "../../components/form";
import {Link, useParams} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import {useGetProduct, useUpdateProduct} from "../../service/product";
import Loader from "../../components/loader";
import Error from "../../components/error";

const Edit: FC = () => {
  const {isPending, mutate} = useUpdateProduct();

  const {id} = useParams<{id: string}>();

  const {data, isLoading, error} = useGetProduct(id);

  if (isLoading) return <Loader />;

  if (error) return <Error message={error.message} />;

  return (
    <div className="max-w-[1000px] mx-auto">
      <Link
        to="/admin/dashboard"
        className="text-my-blue flex items-center gap-2 mb-2"
      >
        <ArrowLeft />
        <span>Geri</span>
      </Link>

      <h1 className="text-2xl lg:text-3xl font-semibold mb-5">
        Ürünü Güncelle
      </h1>
      <Form mutate={mutate} isPending={isPending} data={data} />
    </div>
  );
};

export default Edit;
