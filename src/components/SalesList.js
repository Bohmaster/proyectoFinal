import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import conf from "../conf";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const SalesList = () => {
<<<<<<< HEAD
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [tipo, setTipo] = useState('');
    const [productList, setProductList] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [productosIngresados, setProductosIngresados] = useState([]);
    const [precio, setPrecio] = useState(0);
    const [cantidadDeProductos, setCantidadDeProductos] = useState({});
    const [montoGlobal, setMontoGlobal] = useState(0);

    let montoTotal = 0;

    const handleCantidadDeProductos = (id) => (evt) => {
        setCantidadDeProductos({
            ...cantidadDeProductos,
            [id]: evt.target.value
        })
    };
=======
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [tipo, setTipo] = useState("");
  const [productList, setProductList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productosIngresados, setProductosIngresados] = useState([]);
  const [mostrarListaDeProducto, setMostrarListaDeProducto] = useState(false);
>>>>>>> 452e14eada276945badd54ea4553d837888b8a09

  const handleChangeMonto = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

<<<<<<< HEAD
    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };

    const handleChangeProduct = (event) => {
        setSelectedProductId(event.target.value);
        setCantidadDeProductos({
            ...cantidadDeProductos,
            [event.target.value]: 1
        })
    };

    useEffect(() => {
        axios.get(`${conf.API_URL}/products/`)
            .then(response => {
                setProductList(response.data)
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        let total = 0;

        for (let id in cantidadDeProductos) {
            const cantidad = cantidadDeProductos[id];
            const precio = productosIngresados.find(productoIngresado => productoIngresado.id == id).precio;

            total += cantidad * precio
        }

        setMontoGlobal(total)
    }, [cantidadDeProductos]);

    const clickProductosIngresados = (product) => () => {
        setProductosIngresados(
            [...productosIngresados, product]
        )
    };
    console.log('productosIngresados', productosIngresados);

    return (
        <div>
            <h1>El monto global es: {montoGlobal}</h1>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">tipo</InputLabel>  
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={tipo}
                    onChange={handleChangeTipo}
                >
                    <MenuItem value="" disabled>
                        <em>----</em>
                    </MenuItem>
                    <MenuItem value={0}>Egreso</MenuItem>
                    <MenuItem value={1}>Ingreso</MenuItem>
                </Select>
            </FormControl>
            {
                tipo === 1 ?
                    (
                        <div>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-filled-label">tipo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={selectedProductId}
                                    onChange={handleChangeProduct}
                                >
                                    <MenuItem value="" disabled>
                                        <em>----</em>
                                    </MenuItem>
                                    {
                                        productList.map(product => <MenuItem onClick={clickProductosIngresados(product)} value={product.id}>{product.nombre}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                            {
                                productosIngresados.map(product => {
                                    const montoProducto = product.precio * cantidadDeProductos[product.id];
                                    montoTotal += montoProducto

                                    return (
                                        <div>
                                            <h1>{product.nombre}</h1>
                                            <h4>{product.descripcion}</h4>
                                            <h1>El monto es: {montoProducto}</h1>
                                            <div>
                                                <FormControl fullWidth className={classes.margin} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-amount">Unidades</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-amount"
                                                        value={cantidadDeProductos[product.id]}
                                                        onChange={handleCantidadDeProductos(product.id)}
                                                        startAdornment={<InputAdornment position="start">Ingresar cantidad:</InputAdornment>}
                                                        labelWidth={60}
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) :
                    null
            }
            {
                tipo === 0 ?
                    (
                        <div>
                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={values.amount}
                                    onChange={handleChangeMonto('amount')}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={60}
                                />
                            </FormControl>
                        </div>
                    ) :
                    null
            }
            <div>
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="Fecha"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </div>
=======
  const handleChangeTipo = (event) => {
    setTipo(event.target.value);
  };

  const handleChangeProduct = (event) => {
    setSelectedProductId(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`${conf.API_URL}/products/`)
      .then((response) => {
        setProductList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const clickProductosIngresados = (producto) => {
    axios
      .get(`${conf.API_URL}/products/`)
      .then((response) => {
        setProductosIngresados([...productosIngresados, producto]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">tipo</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={tipo}
          onChange={handleChangeTipo}
        >
          <MenuItem value="" disabled>
            <em>----</em>
          </MenuItem>
          <MenuItem value={0}>Egreso</MenuItem>
          <MenuItem value={1}>Ingreso</MenuItem>
        </Select>
      </FormControl>
      {tipo === 1 ? (
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">tipo</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedProductId}
              onChange={handleChangeProduct}
            >
              <MenuItem value="" disabled>
                <em>----</em>
              </MenuItem>
              {productList.map((product) => (
                <MenuItem
                  onClick={clickProductosIngresados(product)}
                  value={product.nombre}
                >
                  {product.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ) : null}
      {tipo === 0 ? (
        <div>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={values.amount}
              onChange={handleChangeMonto("amount")}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
>>>>>>> 452e14eada276945badd54ea4553d837888b8a09
        </div>
      ) : null}
      <div>
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="Fecha"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default SalesList;
