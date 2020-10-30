using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.UI.HtmlControls;

namespace GMS
{
    public partial class frmUserView : System.Web.UI.Page
    {
        static string strConn = ConfigurationSettings.AppSettings["strCon"];
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Convert.ToString(Session["user_id"]) == "")
                {
                    Response.Redirect("index.aspx");
                }
            }
        }


        [System.Web.Services.WebMethod]
        public static string fnUserView()
        {
            string strXml = "";
            try
            {

                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_user_view", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;                

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                return "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string fnUserDelete(string strDeleteId)
        {
            int intReturn = 0;

            try
            {
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_user_delete", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(strDeleteId);
               
                objCmd.Parameters.Add("@intRet", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }
                objCmd.ExecuteNonQuery();

                intReturn = Convert.ToInt16(objCmd.Parameters["@intRet"].Value);

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                intReturn = -1;
            }

            return intReturn.ToString();
        }
    }
}