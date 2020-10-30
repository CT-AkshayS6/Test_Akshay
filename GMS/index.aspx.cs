using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
//using LISA.LayerBusiness;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace GMS
{
    public partial class index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        [System.Web.Services.WebMethod]
        public static string Login(string strEmail, string strMobile)
        {

            int intReturn = 1;

            try
            {
                string strConn = ConfigurationSettings.AppSettings["strCon"];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_user_login", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;
                objCmd.CommandTimeout = 120;

                objCmd.Parameters.Add("@user_email", SqlDbType.VarChar, 100).Value = strEmail;
                objCmd.Parameters.Add("@user_mobile", SqlDbType.VarChar, 15).Value = strMobile;
                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Direction = ParameterDirection.Output;

                objCmd.Parameters.Add("@user_fname", SqlDbType.VarChar, 50).Direction = ParameterDirection.Output;
                objCmd.Parameters.Add("@user_lname", SqlDbType.VarChar, 50).Direction = ParameterDirection.Output;
                
                objCmd.Parameters.Add("@intRet", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }
                objCmd.ExecuteNonQuery();

                intReturn = Convert.ToInt16(objCmd.Parameters["@intRet"].Value);

                if (intReturn == 1)
                {
                    HttpContext.Current.Session["user_id"] = Convert.ToInt16(objCmd.Parameters["@user_id"].Value);
                    HttpContext.Current.Session["user_fname"] = Convert.ToString(objCmd.Parameters["@user_fname"].Value);
                    HttpContext.Current.Session["user_lname"] = Convert.ToString(objCmd.Parameters["@user_lname"].Value);
                    
                }

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